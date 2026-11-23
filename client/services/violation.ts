import api from "../lib/api";

export async function sendViolation(
  interviewId: string,
  reason: string,
) {
  return api.post(
    `/interview/${interviewId}/violation`,
    {
      reason,
    },
  );
}