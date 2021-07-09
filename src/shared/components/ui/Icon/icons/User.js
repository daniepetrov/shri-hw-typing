function SvgComponent(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8.125 8a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm2.45.875h-.457a4.765 4.765 0 01-3.986 0h-.457A3.676 3.676 0 002 12.55v1.137C2 14.412 2.588 15 3.313 15h9.624c.725 0 1.313-.588 1.313-1.313V12.55a3.676 3.676 0 00-3.675-3.675z" />
    </svg>
  )
}

export default SvgComponent
