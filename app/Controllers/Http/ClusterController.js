'use strict';

const fs = require('fs').promises; // Use promises for async operations
const path = require('path');

const dataPath = path.join(__dirname, '../../../data/clusters.json');

class ClustersController {
  // Get all clusters
  async index({ response }) {
    try {
      const data = await fs.readFile(dataPath, 'utf-8');
      const clusters = JSON.parse(data);
      return response.json(clusters);
    } catch (error) {
      return response.status(500).json({ message: 'Failed to read clusters data' });
    }
  }

  // Get metrics for a specific cluster
  async showMetrics({ params, response }) {
    try {
      const data = await fs.readFile(dataPath, 'utf-8');
      const clusters = JSON.parse(data);
      const cluster = clusters.find(c => c.id === params.id);
      if (cluster) {
        return response.json({ iops: cluster.iops, throughput: cluster.throughput });
      }
      return response.status(404).json({ message: 'Cluster not found' });
    } catch (error) {
      return response.status(500).json({ message: 'Failed to read clusters data' });
    }
  }

  // Get snapshot policy for a specific cluster
  async getSnapshotPolicy({ params, response }) {
    try {
      const data = await fs.readFile(dataPath, 'utf-8');
      const clusters = JSON.parse(data);
      const cluster = clusters.find(c => c.id === params.id);
      if (cluster) {
        return response.json(cluster.snapshot_policy);
      }
      return response.status(404).json({ message: 'Cluster not found' });
    } catch (error) {
      return response.status(500).json({ message: 'Failed to read clusters data' });
    }
  }

  // Update snapshot policy for a specific cluster
  async updateSnapshotPolicy({ params, request, response }) {
    try {
      // Read the existing data from the JSON file
      const data = await fs.readFile(dataPath, 'utf-8');
      const clusters = JSON.parse(data);
      const clusterIndex = clusters.findIndex(c => c.id === params.id);
  
      // If the cluster is found
      if (clusterIndex !== -1) {
        const newPolicy = request.input('snapshot_policy');
  
        // If no new policy is provided, return an error
        if (!newPolicy) {
          return response.status(400).json({ message: 'No valid new policy provided' });
        }
  
        // Merge the new policy with the existing one
        clusters[clusterIndex].snapshot_policy = {
          ...clusters[clusterIndex].snapshot_policy,  // Keep existing policy fields
          ...newPolicy,  // Overwrite only the provided fields
          days: { 
            ...clusters[clusterIndex].snapshot_policy.days,  // Merge the days object specifically
            ...newPolicy.days  // Update only the days provided in the newPolicy
          }
        };
  
        // Write the updated clusters back to the file
        await fs.writeFile(dataPath, JSON.stringify(clusters, null, 2));
        
        // Return the updated snapshot policy in the response
        return response.json(clusters[clusterIndex].snapshot_policy);
      }
  
      // If the cluster was not found
      return response.status(404).json({ message: 'Cluster not found' });
    } catch (error) {
      console.error('Error during snapshot policy update:', error);  // Log any errors
      return response.status(500).json({ message: 'Failed to update clusters data' });
    }
  }
}  

module.exports = ClustersController;
