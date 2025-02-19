docker compose down
#./genRsaKeys.sh
yarn tsc user-microservice/src/*.ts --outDir user-microservice/dist --downlevelIteration
docker build -t user_microservice:1.0 ./user-microservice

yarn tsc transaction-microservice/src/*.ts --outDir transaction-microservice/dist --downlevelIteration
docker build -t transaction_microservice:1.0 ./transaction-microservice

yarn --cwd ./frontend build

docker compose up -d