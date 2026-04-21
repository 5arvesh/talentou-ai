  export const setAuthData =(userData)=>{
    // console.log("userData",userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("sas_url", userData.sas_url);
    localStorage.setItem("sas_token", userData.sas_token);
    localStorage.setItem("userId", userData.user_id);
    localStorage.setItem("tenantId", userData?.tenant_id);
    localStorage.setItem("userEmail", userData?.email);
    localStorage.setItem("role", userData.active_role_key);
    localStorage.setItem("first_name", userData.first_name);
    localStorage.setItem("last_name", userData.last_name);
    localStorage.setItem("chat_history", userData.chat_status);
    localStorage.setItem("project_id", userData.active_project_id);
    localStorage.setItem("is_db_empty", userData.is_db_empty);
    localStorage.setItem("is_outreach_empty", userData.is_outreach_empty);
    localStorage.setItem("db_companies_count", userData.db_companies_count);
    localStorage.setItem("db_contacts_count", userData.db_contacts_count);
    localStorage.setItem("logo_url", userData.logo_url);

    localStorage.setItem("accordionState","expanded") 
    localStorage.setItem(
      "last_login_date",
      userData.last_login_date ? userData.last_login_date : ""
    );

}