import { ItemUpdate, ItemValue } from "@/component/type";
import axiosService from "../axios/axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;


export default class Item_API {
    static async getItems(): Promise<any> {
      return await axiosService({
        method: "GET",
        url: `${API_URL}/items`,
        
      });
    }
    static async updateItems(id: string, data: ItemUpdate): Promise<any> {
      return await axiosService({
        method: 'PATCH',
        data: data,
        url: `${API_URL}/items/${id}`, 
      });
    }
      static async createItem (data:ItemValue): Promise<any> {
        return await axiosService({
          method: 'POST',
          data: data,
          url: `${API_URL}/items`,
        });
      }
      static async deleteItems(id: string): Promise<any> {
        return await axiosService({
          method: 'DELETE',
          url: `${API_URL}/items/${id}`, 
        });
      }
  }
