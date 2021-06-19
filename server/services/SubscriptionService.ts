import express from 'express'
import fs from 'fs';
import path from 'path';
import { Package } from '../interface/Package';

class SubscriptionService {

  /**
   * 
   * @param req 
   * @returns 
   */

  public async getPackages(req: express.Request): Promise<any> {
    const json_path =  path.join(__dirname, '../json', 'packages.json');
    const packages: Package = JSON.parse(fs.readFileSync(json_path).toString());
    return packages;
  }

        
}

export default new SubscriptionService();