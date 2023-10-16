/* eslint-disable no-var */

declare global {
  var mongoose: {
    conn: mongoose;
    promise: Promise<mongoose> | null;
  };
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
    }
  }
}

export {};
