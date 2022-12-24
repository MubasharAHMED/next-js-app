const TodoCategory = (props) => {
  const { children, ...otherProps } = props

  return (
    <ul
      className="flex flex-nowrap overflow-auto text-center border-b "
      {...otherProps}
    >
      {children}
    </ul>
  )
}

export default TodoCategory
