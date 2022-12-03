Docker version `20.10.14` with [Docker Buildkit](https://github.com/moby/buildkit) enabled is required for building the environment and executing the examples.
We recommend using [Docker Desktop](https://www.docker.com/products/docker-desktop/), which already enables Buildkit by default.
Alternatively, an environment variable with value `DOCKER_BUILDKIT=1` can also be set.

The below instructions have been tested in systems running both Linux (Ubuntu), MacOS, and Windows (using [WSL](https://docs.microsoft.com/en-us/windows/wsl/install), which is highly recommended for Windows users).

## Building

To run the examples, first clone the repository as follows:

```shell
git clone https://github.com/cartesi/rollups-examples.git
```

Then, for each example, build the required docker images:

```shell
cd <example>
docker buildx bake --load
```

This will also build the example's Cartesi Machine containing the DApp's back-end logic.

The file `<example>/dapp.json` contains some configurations for building the application. In particular, it defines the back-end's entry-point executable, along with any other files that should be made available inside the Cartesi Machine.
For certain examples, the build process also includes special [procedures for downloading and installing additional dependencies](./calculator/README.md#installing-extra-dependencies) required by the application.

## Running
### Host mode

The _Cartesi Rollups Host Environment_ provides the very same HTTP API as the regular one, mimicking the behavior of the actual layer-1 and layer-2 components. This way, the Cartesi Rollups infrastructure can make HTTP requests to a back-end that is running natively on localhost. This allows the developer to test and debug the back-end logic using familiar tools, such as an IDE.

The host environment can be executed with the following command:

```shell
docker compose -f ../docker-compose.yml -f ./docker-compose.override.yml -f ../docker-compose-host.yml up
```

_Note_: In production mode, rejected inputs are guaranteed to have no effect on the back-end, since in that case the Cartesi Machine is completely rolled back to its previous state. However, in host mode there is no such guarantee and it is possible for changes to persist, for instance if the DApp allows an invalid input to change a global variable or produce a database write before it is rejected.

_Note_: When running in host mode, localhost port `5004` will be used by default to allow the DApp's back-end to communicate with the Cartesi Rollups framework.