declare module "simplebar-react" {
  import type { ComponentProps, FC, RefObject } from "react"
  import type SimpleBarCore from "simplebar-core"

  export interface SimpleBarProps extends ComponentProps<"div"> {
    scrollableNodeProps?: {
      ref?: RefObject<HTMLElement>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any
    }
    forceVisible?: "x" | "y" | boolean
    classNames?: SimpleBarCore.classNames
    autoHide?: boolean
  }

  const SimpleBar: FC<SimpleBarProps>
  export default SimpleBar
}
