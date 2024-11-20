import UserTableRow from "./userTableRow"

export default function UserTable() {
   const datosUsuarios = [ {id_usuario: 1, nombre: 'Juan', rol: 'Administrador', status: 'Activo'}, {id_usuario: 2, nombre: 'Pedro', rol: 'Cajero', status: 'Inactivo'}, {id_usuario: 3, nombre: 'Maria', rol: 'Cocinero', status: 'Activo'}]
  return (
  <>
  <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-blue-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Rol</th>
                  <th className="px-4 py-3">Estatus</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {datosUsuarios.map((usuario) => (
                  <UserTableRow key={usuario.id_usuario} props={usuario} />
                ))}
              </tbody>
            </table>
  </>
  )
}
