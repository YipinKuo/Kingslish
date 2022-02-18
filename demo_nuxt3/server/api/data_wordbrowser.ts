import type { IncomingMessage, ServerResponse } from 'http'
import { MongoClient } from 'mongodb'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const uri = "mongodb+srv://kevin:qazWSXedcRFV@cluster0.cvv6u.mongodb.net?retryWrites=true&writeConcern=majority";
  //const uri = 'mongodb://adm518:1qazWSX3edcRFV@soicsrv03.soic.org.tw:6603/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
  const client = new MongoClient(uri);
  await client.connect();
  const database = client.db("Demo");
  const tests = database.collection(" e4f_word");
  const query = { word: "fawn" };
  const options = { };
  const t = await tests.findOne(query, options);
  res.statusCode = 200;
  res.end(JSON.stringify(t));
  await client.close();
}