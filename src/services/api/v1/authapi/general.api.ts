import { request } from "../../../request";

const prefix = "/auth/general";

export const general_auth_api = {
  create_sigtoken: () => {
    return request({
      url: `${prefix}/create/sigtoken`,
      method: "get",
    });
  },
  verify_cardAccount: (cardAccount: string) => {
    return request(
      {
        url: `${prefix}/card/verify`,
        method: "get",
        data: { cardAccount },
      },
      { throwErr: true }
    );
  },
  resend_verification_email: () => {
    return request(
      {
        url: `${prefix}/verification_email/resend`,
        method: "post",
      },
      { showloading: true }
    );
  },
};
