import { mutateData, products } from '~/modals/product'
import axiosClient from './axiosClient'

export const handleError = (error: any) => {
  if (error.response.data) {
    throw new Error(error.response.data)
  } else {
    throw new Error(error.message)
  }
}

export const productApi = {
  async getProducts({ queryKey }: { queryKey: string[] }) {
    try {
      const res: products = await axiosClient.get(`${queryKey[0]}`)
      return res?.products
    } catch (error: any) {
      handleError(error)
    }
  },
  async searchProduct({ queryKey }: { queryKey: string[] }) {
    try {
      const res: products = await axiosClient.get(`${queryKey[0]}`)
      return res?.products
    } catch (error: any) {
      handleError(error)
    }
  },
  async updateAProduct(newData: mutateData) {
    try {
      const res = await axiosClient.put(
        `/products/${newData.id}`,
        JSON.stringify({ title: newData.title })
      )
      return res
    } catch (error: any) {
      handleError(error)
    }
  }
}
