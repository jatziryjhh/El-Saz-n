import UserTable from "../../components/table/userTable";

export default function GerenteHome() {
  return (
    <>
      <h1 className="text-lg font-bold ">Usuarios</h1>
      <section className="flex container justify-center mx-auto p-6 ">
        <div className="w-3/4 mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full  overflow-x-auto">
            <UserTable />
          </div>
        </div>
      </section>
    </>
  );
}
