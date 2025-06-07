import UserRow from "./UserRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useUsersBalance } from "./useUsersBalance";
import Pagination from "../../ui/Pagination";
import Spinner from './../../ui/Spinner';

function UserTable() {
  const { isLoading, users, pagination } = useUsersBalance();

  if(isLoading) return <Spinner/>

  if (!users.length) return <Empty resourceName="users" />;

  return (
    <Menus>
      <Table columns="2.4fr 1.6fr 1.4fr 1fr 1fr 1fr 3.2rem">
        <Table.Header>
          <div>User</div>
          <div>Phone</div>
          <div>Date Of Birth</div>
          <div>Sex</div>
          <div>Role</div>
          <div>Balance</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={users}
          render={(user) => <UserRow key={user.id} user={user} />}
        />

        <Table.Footer>
           <Pagination pagination={pagination} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default UserTable;