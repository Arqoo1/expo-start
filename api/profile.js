import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "./axios";

const getProfileRequest = async () => {
  const res = await api.get("/profile");
  return res.data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileRequest,
  });
};

const updateProfileRequest = async (data) => {
  const res = await api.put("/profile", {
    name: data.name,
    surname: data.surname,
    email: data.email,
    phone: data.phone,
  });
  return res.data;
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfileRequest,
  });
};
