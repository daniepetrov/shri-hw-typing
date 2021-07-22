import { SVGProps } from "react"

function SvgComponent(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 9 10"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8.289 4.193L1.414.128C.855-.202 0 .118 0 .935v8.127a.937.937 0 001.414.806l6.875-4.062a.936.936 0 000-1.613z" />
    </svg>
  )
}

export default SvgComponent
