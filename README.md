
# Cluster Manager

## Installation Process

1. Clone the Git repository.
2. Open a terminal.
3. Run the command:

    `npm install -g @adonisjs/cli`

4. Install node modules:

    `npm install`

5. Start the server:

   `adonis serve --dev`

## API Endpoints

1. **Get All Clusters**

   - **Method:** `GET`
   - **Endpoint:** `/api/clusters`
   - **Description:** Retrieve the details of all clusters.

2. **Get Cluster Metrics**

   - **Method:** `GET`
   - **Endpoint:** `/api/clusters/metrics/:id`
   - **Description:** Fetches IOPS (Input/Output Operations per Second) and throughput data for a specific cluster by its ID.

3. **Get Snapshot Policy**

   - **Method:** `GET`
   - **Endpoint:** `/api/clusters/snapshot-policy/:id`
   - **Description:** Retrieves the snapshot policy for a specific cluster by its ID.

4. **Update Snapshot Policy**

   - **Method:** `POST`
   - **Endpoint:** `/api/clusters/snapshot-policy/:id`
   - **Description:** Updates the snapshot policy for a specific cluster identified by the `id`.
