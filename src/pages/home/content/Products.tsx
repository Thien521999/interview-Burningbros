import { useMemo, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { productApi } from '~/api/productApi'
import { InputField } from '~/components/Common/form-fields/input-field/InputField'
import { product, productUpdate } from '~/modals/product'
import { formatPrice } from '~/utils/common'
import ic_bottom from '../../../../public/ic_bottom.svg'
import ic_right from '../../../../public/ic_right.svg'

interface IProductProps {
  products: product[]
  category: string
  handleGetIdUpdate: (category: string, productUpdate: product[]) => void
}

export const Products = ({ products, category, handleGetIdUpdate }: IProductProps) => {
  const inputRef = useRef<HTMLDivElement>(null)
  const contentEl = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  const update = useMutation(productApi.updateAProduct, {
    onSuccess: () => {
      // show noti update success
    },
    onError: (error) => console.log('error', error)
    // onSettled: () => queryClient.invalidateQueries() //update products after edit (api hien tai ko hỗ trợ)
  })

  const newContent = useMemo(() => {
    return products?.map((item: product) => ({ ...item, isEdit: false }))
  }, [products])

  const { control, handleSubmit } = useForm({
    defaultValues: {
      PRODUCTS: [...newContent]
    }
  })

  const { fields } = useFieldArray({
    control,
    name: 'PRODUCTS'
  })

  const [idx, setIdx] = useState(0)
  const [isClicked, setIsClicked] = useState(false)
  const [dataProduct, setDataProduct] = useState<product[]>(fields)

  const handleReset = () => {
    setDataProduct([...fields])
  }

  const handleToggle = () => {
    setIsClicked((prev) => !prev)
    // handleReset()
  }

  const handleSudmitEdit = async (values: productUpdate) => {
    const category = values.PRODUCTS[0].category
    const title: string = values.PRODUCTS[idx - 1].title

    update.mutate({ id: idx, title })
    handleGetIdUpdate(category, values.PRODUCTS)

    console.log('values', values)

    queryClient.setQueryData('productUpdate', values.PRODUCTS)
  }

  const handleClickTitle = (e: React.MouseEvent<HTMLDivElement>, id: number, idx: number) => {
    e.stopPropagation()
    if (inputRef.current) {
      inputRef.current.focus()
    }
    const updateProduct: product[] = [...fields]

    const newUpdateProduct: product[] =
      updateProduct &&
      updateProduct.map((item: product) => ({
        ...item,
        isEdit: item.id === id ? true : false
      }))
    setDataProduct(newUpdateProduct)
    setIdx(idx)
  }

  return (
    <div className={!isClicked ? `hover:bg-[#f8f8f9] hover:rounded-lg` : ''}>
      <div onClick={handleToggle} className="flex flex-nowrap gap-2 cursor-pointer py-4 px-3">
        <div>
          {isClicked ? (
            <img src={ic_bottom} alt="ic_bottom" />
          ) : (
            <img src={ic_right} alt="ic_right" />
          )}
        </div>
        <div className="text-[18px] leading-6 font-semibold text-[#353C49] uppercase">
          {category}
        </div>
      </div>

      {dataProduct &&
        dataProduct.map((item: product, index: number) => (
          <div
            key={uuidv4()}
            className={
              !isClicked
                ? 'hover:bg-[#f8f8f9] hover:border hover:border-[#D1B8FA] hover:rounded-lg box-border cursor-pointer'
                : 'px-4 py-3 hover:border hover:border-[#D1B8FA] rounded-lg box-border cursor-pointer'
            }
            // onClick={handleReset}
          >
            <div
              ref={contentEl}
              className="h-[0px] overflow-hidden grid grid-cols-[72px_auto] gap-6 pl-4"
              style={
                isClicked
                  ? { height: Number(contentEl.current?.scrollHeight) }
                  : { height: 0, padding: 0 }
              }
            >
              <div>
                <img className="w-[72px] h-[72px]" src={item.images[0]} alt="mobile" />
              </div>
              <div>
                {item.isEdit ? (
                  <form onSubmit={handleSubmit(handleSudmitEdit)}>
                    <InputField
                      inputRef={inputRef}
                      name={`PRODUCTS.${index}.title`}
                      control={control}
                      onclick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                    />
                  </form>
                ) : (
                  <div
                    className="text-[16px] leading-5 font-semibold text-[#353C49] p-2 hover:bg-[#f3f4f6] hover:rounded-[8px]"
                    onClick={(e) => handleClickTitle(e, item.id, item.idx)}
                    onBlur={() => handleReset}
                  >
                    {item.title}
                  </div>
                )}
                <div className="text-[14px] leading-4 text-[#353C49] p-2">
                  {formatPrice(item.price)}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
