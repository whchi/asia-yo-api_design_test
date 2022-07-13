[code here](code/README.md)
# path
[GET] `/api/currency-transfer/:price/:from/:to`
# params
| name  | description                                      |
| :---: | :----------------------------------------------- |
| price | **MUST** be a `Number` and > 0                   |
| from  | **MUST** in transferable currency(twd, jpy, usd) |
|  to   | **MUST** in transferable currency(twd, jpy, usd) |

# succcess example
```json
// /api/currency-transfer/100/twd/usd
{
  "status": 200,
  "data": {
    "value": "3.28"
  },
  "message": "from 100 TWD to 3.28 USD"
}
// /api/currency-transfer/100.23/usd/twd
{
  "status": 200,
  "data": {
    "value": "3,051.40"
  },
  "message": "from 100.23 USD to 3,051.40 TWD"
}

// /api/currency-transfer/100934.23/usd/jpy
{
  "status": 200,
  "data": {
    "value": "11,284,547.85"
  },
  "message": "from 100934.23 USD to 11,284,547.85 JPY"
}
```
# fail example
```json
// /api/currency-transfer/-100/usd/twd
{
  "status": 422,
  "data": [],
  "message": "price MUST > 0"
}

// /api/currency-transfer/1,00/usd/twd
{
  "status": 422,
  "data": [],
  "message": "Invalid price format, must be a Number"
}

// /api/currency-transfer/100/usdfake/twd
{
  "status": 422,
  "data": [],
  "message": "Invalid currency type"
}
```
