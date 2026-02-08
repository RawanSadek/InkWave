export const REQUIRED_FIELD = (field_name: string) => ({
  required: `${field_name} is required!`,
});

export const IMG_VALIDATION = (formMode: string | null) => ({
  required:
    formMode === "add" ? "Image is required" : false,
});

export const URL_VALIDATION = {
  required: `Image URL is required!`,
  // pattern: {
  //     value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i,
  //     message: "Please enter a valid URL!"
  // }
};

export const EMAIL_VALIDATION = {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Please enter a valid email!",
  },
};

export const PASSWORD_VALIDATION = {
  required: "Password is required",
  pattern: {
    value:
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,12}$/,
    message:
      "Password must be 8 to 12 characters long and include at least one uppercase letter, one number, and one special character (e.g., !, @, #, $).",
  },
};

export const CONFIRM_PASSWORD_VALIDATION = (password: string) => ({
  required: "Please confirm your password",
  validate: (value: string) => value === password || "Passwords must match",
});
