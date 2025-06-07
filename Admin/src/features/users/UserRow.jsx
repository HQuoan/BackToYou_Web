import styled from "styled-components";
import Table from "../../ui/Table";
import { formatVndCurrency } from "../../utils/helpers";
import { format } from "date-fns";
import { ADMIN_ROLE, CUSTOMER_ROLE } from "../../utils/constants";
import { useAssignRole } from "../authentication/useAssignRole";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiOutlineUserGroup, HiPlus } from "react-icons/hi2";
import AddFundsForm from "./AddFundsForm";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const InfoCell = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function UserRow({ user }) {
  const { isLoading, assignRole } = useAssignRole();

  function handleAssignRole() {
    if (user.role === ADMIN_ROLE) {
      assignRole({ email: user.email, role: CUSTOMER_ROLE });
    } else {
      assignRole({ email: user.email, role: ADMIN_ROLE });
    }
  }

  return (
    <>
      <Table.Row>
        <Stacked>
          <span>{user.fullName}</span>
          <span>{user.email}</span>
        </Stacked>

        <InfoCell>{user.phoneNumber ?? "Unknown"} </InfoCell>
        <InfoCell>{format(new Date(user.dateOfBirth), "MMM dd yyyy")}</InfoCell>
        <InfoCell>{user.sex}</InfoCell>
        <InfoCell>{user.role}</InfoCell>

        <Amount>{formatVndCurrency(user?.wallet?.balance ?? 0)}</Amount>

        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={user.id} />
            <Menus.List id={user.id}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPlus />}>Add funds</Menus.Button>
              </Modal.Open>
              <Menus.Button
                icon={<HiOutlineUserGroup />}
                onClick={handleAssignRole}
                disabled={isLoading}
              >
                Assign to{" "}
                {user.role === ADMIN_ROLE ? CUSTOMER_ROLE : ADMIN_ROLE}
              </Menus.Button>
            </Menus.List>

            <Modal.Window name="edit">
              <AddFundsForm user={user} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Table.Row>
    </>
  );
}

export default UserRow;
