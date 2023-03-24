import { forwardRef, useRef, useEffect } from "react"
import { TableToggleAllRowsSelectedProps } from "react-table"

export const IndeterminateCheckbox = forwardRef(
    (
      { indeterminate, ...rest }: Partial<TableToggleAllRowsSelectedProps>,
      ref
    ) => {
      const defaultRef = useRef<HTMLInputElement | null>(null)
      const resolvedRef =
        (ref as React.MutableRefObject<HTMLInputElement | null>) || defaultRef
  
      useEffect(() => {
        if (resolvedRef.current) {
          resolvedRef.current.indeterminate = indeterminate as boolean
        }
      }, [resolvedRef, indeterminate])
  
      return (
        <div className="w-full h-full flex justify-center items-center">

      <input type='checkbox' ref={resolvedRef} {...rest} />
        </div>
      )
    }
  )