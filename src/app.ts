import * as express from 'express';
import * as path from 'path';
import * as minimist from 'minimist';
import * as BodyParser from 'body-parser';
import * as AWS from 'aws-sdk';

AWS.config.update({
    region:'us-east-2'
  });

let app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

//Simple get call for testing project setup
app.get('/', function (req, res) {
    console.log("request received");
    res.send({"msg":"Node Express API works!"});
});

let dynamodb = new AWS.DynamoDB();
app.get('/companies', (req, res) => {
    console.log("request received, fetching company");
    let company = {};
    let dbParams: AWS.DynamoDB.GetItemInput = {
        TableName : 'Company',
      Key: {
        "ID" : {
          S: '1'
      }
    }
  };
    // DynamoDB.GetItemInput
    dynamodb.getItem(dbParams, function(error, data){
      if(error){
        console.log('No company found: ',error);
        res.json(company);
      }else{
        if(data){
          console.log('Company is : '+data);
          company = data;
          res.json(data);
        }
      }
    });
  });

app.listen(3000, () => console.log('ready on port 3000') );