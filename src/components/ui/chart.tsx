import * as React from "react"
import { TooltipProps } from "recharts"
import { cn } from "../utils/cn"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, config, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full h-[350px]", className)}
        {...props}
        style={
          {
            "--chart-colors": Object.values(config)
              .map((c) => c.color)
              .join(" "),
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = ({
  active,
  payload,
  label,
  content,
  ...props
}: TooltipProps<any, any>) => {
  if (!active || !payload) {
    return null
  }

  if (content) {
    if (React.isValidElement(content)) {
      return React.cloneElement(content as React.ReactElement<any>, { active, payload, label });
    } else if (typeof content === 'function') {
      return <>{content({ active, payload, label })}</>;
    }
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {item.name}
            </span>
            <span className="font-bold text-muted-foreground">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const ChartTooltipContent = ({
  active,
  payload,
  label,
  config,
}: TooltipProps<any, any> & { config: ChartConfig }) => {
  if (!active || !payload) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex flex-col">
            <span
              className="text-[0.70rem] uppercase"
              style={{ color: config[item.name].color }}
            >
              {config[item.name].label}
            </span>
            <span className="font-bold text-muted-foreground">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent }