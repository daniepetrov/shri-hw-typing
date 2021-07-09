function SvgComponent(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 1C5.923 1 1 5.923 1 12s4.923 11 11 11 11-4.923 11-11S18.077 1 12 1zm4.102 13.883l-.887 1.109a.71.71 0 01-.997.11l-2.972-2.204a1.773 1.773 0 01-.665-1.386v-6.9a.71.71 0 01.71-.709h1.419a.71.71 0 01.71.71V12l2.572 1.885a.708.708 0 01.11.998z" />
    </svg>
  )
}

export default SvgComponent
