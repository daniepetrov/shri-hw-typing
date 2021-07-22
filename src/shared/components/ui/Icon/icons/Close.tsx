import { SVGProps } from "react"

function SvgComponent(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8 16c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm4-10.88L10.88 4 8 6.88 5.12 4 4 5.12 6.88 8 4 10.88 5.12 12 8 9.12 10.88 12 12 10.88 9.12 8 12 5.12z" />
    </svg>
  )
}

export default SvgComponent
