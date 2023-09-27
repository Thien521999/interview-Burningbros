import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { productApi } from '~/api/productApi'
import { product, productsMap } from '~/modals/product'
import { Content } from './content/Content'
import { Header } from './header/Header'

interface querydata {
  data: any
  isLoading: boolean
  error: any
}

export const Home = () => {
  const { value } = useParams()
  const [content, setContent] = useState<productsMap[]>()

  const key = '/products'
  const keySearch = `/products/search?q=${value}`
  const {
    data,
    isLoading,
    // isFetching, //docs: https://tanstack.com/query/v3/docs/react/guides/background-fetching-indicators
    // isPreviousData, // isPreviousData && isFetching 2 thang ket hop vs nhau de cache data , show loading
    error
  }: querydata = useQuery({
    queryKey: value ? keySearch : key,
    queryFn: productApi.getProducts
    // keepPreviousData: true, //docs: https://tanstack.com/query/v3/docs/react/guides/paginated-queries,
  })

  useEffect(() => {
    if (data) {
      const result = []
      const categoryMap: any = {}

      const newData = data.map((item: product) => ({
        ...item,
        idx: item.id
      }))

      for (const item of newData) {
        const { category } = item

        if (!categoryMap[category]) {
          categoryMap[category] = {
            category,
            item: [item]
          }
        } else {
          categoryMap[category].item.push(item)
        }
      }

      for (const key in categoryMap) {
        if (categoryMap.hasOwnProperty(key)) {
          result.push(categoryMap[key])
        }
      }
      setContent(result)
    }
  }, [data])

  return (
    <div className=" min-h-screen min-w-screen bg-[#f1e7fe] py-[100px]">
      <div className="max-w-[528px] m-auto py-[24px] h-[880px] bg-[#ffff] p-6 rounded-xl">
        <Header />
        <Content content={content} isLoading={isLoading} />
        {error?.message && <p className="text-[#ff1d1d] text-center">{error?.message}</p>}
      </div>
    </div>
  )
}
