# prerequirement
1. local 3001 port is free
2. docker installed

# pull
```sh
docker pull whcdc/asia-yo-pre-test_currency-transfer
```

# run
```sh
docker run --name whchi_pre_test -p 3001:3001 -ti --rm whcdc/asia-yo-pre-test_currency-transfer
```

# test
```sh
# in local
npm run test
# in container
docker exec -ti whchi_pre_test bash # into container
./node_modules/jest/bin/jest.js tests
```
