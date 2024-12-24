import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextInput,
  Select,
  Switch,
  Group,
  Text,
  Loader,
  Flex,
} from "@mantine/core";
import axios from "axios";
import { UserData } from "../../../types/users-types";
import baseURL from "../../../services/baseURl";

interface EditUserModalProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: UserData) => void;
}

const UserForm = ({ userDetails, setUserDetails }: { userDetails: UserData, setUserDetails: React.Dispatch<React.SetStateAction<UserData>> }) => (
  <>
    <TextInput
      label="User ID"
      value={userDetails.id}
      disabled
      mb="md"
    />
    <TextInput
      label="Username"
      value={userDetails.username || ""}
      onChange={(e) => setUserDetails((prev) => ({ ...prev, username: e.target.value }))}
      mb="md"
    />
    <TextInput
      label="Email"
      value={userDetails.email || ""}
      onChange={(e) => setUserDetails((prev) => ({ ...prev, email: e.target.value }))}
      mb="md"
    />
    <Select
      label="Role"
      value={userDetails.role}
      data={['Admin', 'User', 'Guest']}
      onChange={(value) => setUserDetails((prev) => ({ ...prev, role: value as 'Admin' | 'User' | 'Guest' }))}
      mb="md"
    />
    <Switch
      label={userDetails.isActive ? "Active" : "Inactive"}
      checked={userDetails.isActive}
      onChange={() => setUserDetails((prev) => ({ ...prev, isActive: !prev.isActive }))}
      mb="sm"
    />
  </>
);

const LoadingState = () => (
  <Flex justify="center" align="center">
    <Loader size="lg" variant="bars" />
    <Text align="center" mt="md">Loading user details...</Text>
  </Flex>
);

export const EditUserModal: React.FC<EditUserModalProps> = ({ userId, isOpen, onClose, onSave }) => {
  const [userDetails, setUserDetails] = useState<UserData>({
    id: "",
    username: "",
    email: "",
    role: "User",
    isActive: true,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios.get(`${baseURL}users/${userId}`)
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => console.error("Failed to fetch user details:", error))
        .finally(() => setLoading(false));
    }
  }, [userId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.patch(`${baseURL}users/${userDetails.id}`, userDetails);
      onSave(userDetails);
      onClose();
    } catch (error) {
      console.error("Failed to update user details:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={<Text size="xl" weight={500} align="center">Edit User Details</Text>}
      size="lg"
      centered
    >
      {loading ? <LoadingState /> : (
        <form onSubmit={(e) => e.preventDefault()}>
          <UserForm userDetails={userDetails} setUserDetails={setUserDetails} />
          <Group position="apart" mt="lg">
            <Button variant="outline" color="gray" onClick={onClose}>Cancel</Button>
            <Button color="blue" loading={saving} onClick={handleSave}>Save Changes</Button>
          </Group>
        </form>
      )}
    </Modal>
  );
};
