
type Props = {
  label: string;
  value: any
}

const CustomDetailField = ({label, value }: Props) => {
  return (
      <>
          <div className="my-2">
              <p className='my-3 w-full border-[1px] border-[#7F7F80] p-4 rounded-md'>
                  <strong>{label}</strong>
                  <span className="mx-1 text-md text-justify">{value}</span>
              </p>
          </div>
      </>
  )
}

export default CustomDetailField;