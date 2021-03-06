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
      <path d="M3.2 8c0 .27.022.537.065.8H.3a.3.3 0 01-.3-.3v-1a.3.3 0 01.3-.3h2.965c-.042.263-.065.53-.065.8zm12.5-.8h-2.965a5.006 5.006 0 010 1.6H15.7a.3.3 0 00.3-.3v-1a.3.3 0 00-.3-.3zM8 5.2a2.79 2.79 0 00-1.98.82A2.78 2.78 0 005.2 8c0 .748.29 1.45.82 1.98A2.79 2.79 0 008 10.8a2.79 2.79 0 001.98-.82c.53-.53.82-1.232.82-1.98 0-.747-.29-1.45-.82-1.98A2.79 2.79 0 008 5.2zM8 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z" />
    </svg>
  )
}

export default SvgComponent
