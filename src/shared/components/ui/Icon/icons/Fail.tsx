import { SVGProps } from "react"

function SvgComponent(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 1.344C6.113 1.344 1.344 6.114 1.344 12c0 5.887 4.77 10.656 10.656 10.656 5.887 0 10.656-4.77 10.656-10.656 0-5.887-4.77-10.656-10.656-10.656zm5.225 13.453a.516.516 0 010 .73l-1.702 1.698a.516.516 0 01-.73 0L12 14.406l-2.797 2.819a.516.516 0 01-.73 0l-1.698-1.702a.516.516 0 010-.73L9.594 12 6.775 9.203a.516.516 0 010-.73L8.477 6.77a.516.516 0 01.73 0L12 9.594l2.797-2.819a.516.516 0 01.73 0l1.702 1.702a.516.516 0 010 .73L14.406 12l2.819 2.797z" />
    </svg>
  )
}

export default SvgComponent
