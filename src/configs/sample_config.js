const env = process.env.NODE_ENV; // 'test' or 'prod'

const test = {
  aws: {
    account: '1234578990',
    region: "us-west-2",
    accessKeyId: "AAAAAAAAAAAAAAAAAAA",
    secretAccessKey: "AAaAaaaaAaaaaaaaAaaaaaAaaaaaAaaaaAAaaaaa",
    dynamo: {
      tables: {
        name: "tablename"
      }
    }
  }
};

const prod = {
  aws: {
    account: '1234578990',
    region: "us-west-2",
    accessKeyId: "AAAAAAAAAAAAAAAAAAA",
    secretAccessKey: "AAaAaaaaAaaaaaaaAaaaaaAaaaaaAaaaaAAaaaaa",
    dynamo: {
      tables: {
        name: "tablename"
      }
    }
  }
};

const config = {
  prod,
  test
};

module.exports = config[env];