export interface product {
  brand: string
  category: string
  description: string
  discountPercentage: number
  id: number
  idx: number
  images: string[]
  price: number
  rating: number
  stock: number
  thumbnail: string
  title: string
  isEdit?: boolean | undefined
}

export interface products {
  limit: number
  products: product[]
  skip: number
  total: number
}

export interface productsMap {
  category: string
  item: product[]
}

export interface productUpdate {
  PRODUCTS: product[]
}

export interface mutateData {
  id: number
  title: string
}
