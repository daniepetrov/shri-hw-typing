import { SVGProps } from "react"

function SvgComponent(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 14 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)">
        <path d="M12.279 5.75l.704-.706a.376.376 0 000-.531l-.53-.532a.374.374 0 00-.53 0l-.645.647a6.433 6.433 0 00-3.547-1.587V1.5h.873a.376.376 0 00.374-.375v-.75A.376.376 0 008.604 0H5.362a.376.376 0 00-.374.375v.75c0 .206.168.375.374.375h.873v1.544A6.493 6.493 0 00.499 9.5c0 3.59 2.902 6.5 6.484 6.5 3.581 0 6.484-2.91 6.484-6.5 0-1.397-.44-2.69-1.188-3.75zM6.983 14.5a4.992 4.992 0 01-4.988-5c0-2.763 2.232-5 4.988-5a4.992 4.992 0 014.987 5c0 2.762-2.232 5-4.987 5zm.374-3.5h-.748a.376.376 0 01-.374-.375v-4.25c0-.206.168-.375.374-.375h.748c.205 0 .374.169.374.375v4.25a.376.376 0 01-.374.375z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="#fff" d="M0 0h13.965v16H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SvgComponent