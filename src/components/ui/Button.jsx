import classNames from "classnames"

const variants = {
  primary: "text-black",
}

const Button = (props) => {
  const { variant = "primary", className, ...otherProps } = props

  return (
    <button
      className={classNames(variants[variant], className, "py-1 px-3 text-md")}
      {...otherProps}
    />
  )
}

export default Button
