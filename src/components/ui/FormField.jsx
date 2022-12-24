import { Field } from "formik"
import classNames from "classnames"

const FormField = (props) => {
  const { label, className, ...inputProps } = props

  return (
    <label className={classNames("flex flex-col gap-2", className)}>
      <span className="font-semibold">{label}</span>
      <Field className="border-2 px-2 p-1" {...inputProps} />
    </label>
  )
}

export default FormField
