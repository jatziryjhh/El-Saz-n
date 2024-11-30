/* eslint-disable react/prop-types */
import { CreditCardIcon } from "@heroicons/react/24/solid";

export default function TablePayRow(props) {
  const { id, nombreUsuario, precio, estatus, fechaEntrega } = props;
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-4">{id}</td>
      <td className="py-3 px-4">{nombreUsuario}</td>
      <td className="py-3 px-4">${precio}</td>
      <td className="py-3 px-4">
        <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full text-xs">
          {estatus}
        </span>
      </td>
      <td className="py-3 px-4">{fechaEntrega}</td>
      <td className="py-3 px-4">
        <div className="flex space-x-2">
          <CreditCardIcon className="w-10 h-10 p-2 rounded-lg text-amber-100 bg-amber-900" />
        </div>
      </td>
    </tr>
  );
}
