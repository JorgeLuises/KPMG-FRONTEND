import type { Empleados } from "../types"

type TablaEmpleadosProps = {
  empleados : Empleados
}

export default function TablaEmpleados({ empleados } : TablaEmpleadosProps) {
  return (
    <div className="bg-amber-600 h-full">
      MENU DE OPCIONES
    </div>
  )
}
