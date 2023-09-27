import { useEffect, useState } from 'react'
import { product, productsMap } from '~/modals/product'
import img_gach from '../../../../public/img_gach.svg'
import { Products } from './Products'
import { useQueryClient } from 'react-query'

interface IContentProps {
  content: productsMap[] | undefined
  isLoading: boolean
}

export const Content = ({ content, isLoading }: IContentProps) => {
  const queryClient = useQueryClient()
  const products: productsMap[] | undefined = queryClient.getQueryData('content')

  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false)

  const [newContent, setNewContent] = useState<productsMap[] | undefined>(content)

  const handleGetIdUpdate = (category: string, productUpdate: product[]) => {
    const data: any =
      content &&
      content.map((item: productsMap) => {
        if (item.category === category) {
          return {
            category: item.category,
            item: productUpdate
          }
        }
        return { ...item }
      })
    queryClient.setQueryData('content', data)
    setNewContent(data)
    setIsUpdateSuccess(true)
  }
  useEffect(() => {
    if (isUpdateSuccess && products) {
      setNewContent(products)
    }
  }, [isUpdateSuccess, products])

  return (
    <>
      <div className="flex flex-nowrap gap-4 items-center text-[20px] text-[#353C49] leading-7 font-semibold mb-[24px]">
        Product List
        <img className="w-[70%]" src={img_gach} alt="img_gach" />
      </div>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="box-border overflow-scroll h-[700px]">
          {isUpdateSuccess ? (
            <>
              {' '}
              {newContent &&
                newContent.map((item: productsMap) => (
                  <Products
                    products={item.item}
                    category={item.category}
                    handleGetIdUpdate={handleGetIdUpdate}
                  />
                ))}
            </>
          ) : (
            <>
              {content &&
                content.map((item: productsMap) => (
                  <Products
                    products={item.item}
                    category={item.category}
                    handleGetIdUpdate={handleGetIdUpdate}
                  />
                ))}
            </>
          )}
        </div>
      )}
    </>
  )
}
