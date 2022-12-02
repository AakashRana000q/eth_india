## Requirements

Docker version `20.10.14` with [Docker Buildkit](https://github.com/moby/buildkit) enabled is required for building the environment and executing the examples.
We recommend using [Docker Desktop](https://www.docker.com/products/docker-desktop/), which already enables Buildkit by default.
Alternatively, an environment variable with value `DOCKER_BUILDKIT=1` can also be set.

The below instructions have been tested in systems running both Linux (Ubuntu), MacOS, and Windows (using [WSL](https://docs.microsoft.com/en-us/windows/wsl/install), which is highly recommended for Windows users).


## Building

The host environment can be executed with the following command:

```shell
docker compose -f ../docker-compose.yml -f ./docker-compose.override.yml -f ../docker-compose-host.yml up
```

_Note_: In production mode, rejected inputs are guaranteed to have no effect on the back-end, since in that case the Cartesi Machine is completely rolled back to its previous state. However, in host mode there is no such guarantee and it is possible for changes to persist, for instance if the DApp allows an invalid input to change a global variable or produce a database write before it is rejected.

_Note_: When running in host mode, localhost port `5004` will be used by default to allow the DApp's back-end to communicate with the Cartesi Rollups framework.