export const resources = [
  {
    "name": "Department Batches",
    "slug": "department-batches",
    "key": "departmentBatches",
    "fields": [
      "department_id",
      "batch_id",
      "created_at"
    ]
  },
  {
    "name": "Permission",
    "slug": "permission",
    "key": "permission",
    "fields": [
      "id",
      "slug",
      "description",
      "is_deleted",
      "deleted_at",
      "created_at"
    ]
  },
  {
    "name": "Batch",
    "slug": "batch",
    "key": "batch",
    "fields": [
      "id",
      "batch_no",
      "start_year",
      "endYear",
      "is_deleted",
      "created_at",
      "deleted_at"
    ]
  },
  {
    "name": "Majors",
    "slug": "majors",
    "key": "majors",
    "fields": [
      "id",
      "name",
      "code",
      "description",
      "department_id",
      "is_deleted",
      "created_at",
      "deleted_at"
    ]
  },
  {
    "name": "Group Role Permissions",
    "slug": "group-role-permissions",
    "key": "groupRolePermissions",
    "fields": [
      "group_role_id",
      "permission_slug",
      "is_deleted",
      "assigned_at"
    ]
  },
  {
    "name": "Role Permissions",
    "slug": "role-permissions",
    "key": "rolePermissions",
    "fields": [
      "role_Id",
      "permission_Slug",
      "assigned_at"
    ]
  },
  {
    "name": "Alumnus",
    "slug": "alumnus",
    "key": "alumnus",
    "fields": [
      "id",
      "bio",
      "avatar",
      "company",
      "position",
      "major_Id",
      "batch_Id",
      "post_count",
      "connection_count",
      "is_locked",
      "is_deleted",
      "created_at",
      "updated_at"
    ]
  },
  {
    "name": "Role",
    "slug": "role",
    "key": "role",
    "fields": [
      "id",
      "name",
      "is_deleted",
      "created_at",
      "deleted_at"
    ]
  },
  {
    "name": "Group Role",
    "slug": "group-role",
    "key": "groupRole",
    "fields": [
      "id",
      "name",
      "is_deleted",
      "created_at",
      "deleted_at"
    ]
  },
  {
    "name": "Community Group",
    "slug": "community-group",
    "key": "communityGroup",
    "fields": [
      "id",
      "majorId",
      "name",
      "avatar",
      "type",
      "member_count",
      "limited_member",
      "description",
      "owner_id",
      "status",
      "is_deleted",
      "created_at",
      "updated_at",
      "deleted_at"
    ]
  },
  {
    "name": "Department",
    "slug": "department",
    "key": "department",
    "fields": [
      "id",
      "name",
      "code",
      "description",
      "is_deleted",
      "created_at",
      "deleted_at"
    ]
  },
  {
    "name": "Report Groups",
    "slug": "report-groups",
    "key": "reportGroups",
    "fields": [
      "id",
      "group_id",
      "reporter_id",
      "reason",
      "status",
      "description",
      "reviewer_id",
      "is_deleted",
      "reported_at",
      "deleted_at"
    ]
  },
  {
    "name": "Alumni Office",
    "slug": "alumni-office",
    "key": "alumniOffice",
    "fields": [
      "id",
      "avatar",
      "position",
      "office_department",
      "post_count",
      "is_approved",
      "is_locked",
      "is_deleted",
      "created_at",
      "updated_at"
    ]
  },
  {
    "name": "Social Medias",
    "slug": "social-medias",
    "key": "socialMedias",
    "fields": [
      "alumnus_id",
      "platform",
      "link"
    ]
  },
  {
    "name": "User Roles",
    "slug": "user-roles",
    "key": "userRoles",
    "fields": [
      "user_Id",
      "role_Id",
      "is_deleted",
      "assigned_at"
    ]
  },
  {
    "name": "Alumnus Skills",
    "slug": "alumnus-skills",
    "key": "alumnusSkills",
    "fields": [
      "alumnus_id",
      "skill_name"
    ]
  },
  {
    "name": "Group Members",
    "slug": "group-members",
    "key": "groupMembers",
    "fields": [
      "id",
      "group_id",
      "member_id",
      "status",
      "grouprole_id",
      "joined_at"
    ]
  },
  {
    "name": "Report Users",
    "slug": "report-users",
    "key": "reportUsers",
    "fields": [
      "id",
      "reporter_id",
      "user_id",
      "reason",
      "status",
      "description",
      "reviewer_id",
      "is_deleted",
      "reported_at",
      "updated_at",
      "deleted_at"
    ]
  },
  {
    "name": "User Notifications",
    "slug": "user-notifications",
    "key": "userNotifications",
    "fields": [
      "id",
      "user_id",
      "notification_id",
      "is_read",
      "is_archived",
      "is_deleted",
      "recieved_at",
      "deleted_at"
    ]
  },
  {
    "name": "Process Domain Events",
    "slug": "process-domain-events",
    "key": "processDomainEvents",
    "fields": [
      "id",
      "event_name",
      "processed_at"
    ]
  },
  {
    "name": "User",
    "slug": "user",
    "key": "user",
    "fields": [
      "id",
      "nu_id",
      "first_name",
      "last_name",
      "gender",
      "birthday",
      "email",
      "password",
      "phone_number",
      "status",
      "is_deleted",
      "email_verified_at",
      "created_at",
      "updated_at",
      "deleted_at"
    ]
  },
  {
    "name": "Report Posts",
    "slug": "report-posts",
    "key": "reportPosts",
    "fields": [
      "id",
      "post_Id",
      "reporter_id",
      "reason",
      "status",
      "description",
      "reviewer_id",
      "is_deleted",
      "reported_at",
      "deleted_at"
    ]
  },
  {
    "name": "Medias",
    "slug": "medias",
    "key": "medias",
    "fields": [
      "media_url",
      "media_type",
      "width",
      "height",
      "size_in_byte",
      "externalId",
      "created_at"
    ]
  },
  {
    "name": "Notifications",
    "slug": "notifications",
    "key": "notifications",
    "fields": [
      "id",
      "title",
      "activity_type",
      "message",
      "icon",
      "status",
      "recipient_id",
      "subject_id",
      "is_read",
      "is_deleted",
      "created_at",
      "updated_at",
      "deleted_at"
    ]
  },
  {
    "name": "Connections",
    "slug": "connections",
    "key": "connections",
    "fields": [
      "id",
      "user_id",
      "connected_user_id",
      "status",
      "connected_at"
    ]
  },
  {
    "name": "Group Post",
    "slug": "group-post",
    "key": "groupPost",
    "fields": [
      "id",
      "post_Id",
      "group_id",
      "status",
      "reviewer_id",
      "is_deleted",
      "posted_at",
      "deleted_at"
    ]
  },
  {
    "name": "Comments",
    "slug": "comments",
    "key": "comments",
    "fields": [
      "id",
      "post_id",
      "commenter_id",
      "comment",
      "replied_id",
      "reference",
      "status",
      "reaction_count",
      "reply_count",
      "is_deleted",
      "created_at",
      "updated_at",
      "deleted_at"
    ]
  },
  {
    "name": "Posts",
    "slug": "posts",
    "key": "posts",
    "fields": [
      "id",
      "author_id",
      "shared_post_Id",
      "optional_text",
      "post_type",
      "audience_type",
      "status",
      "reaction_count",
      "comment_count",
      "share_count",
      "is_deleted",
      "created_at",
      "updated_at",
      "deleted_at"
    ]
  },
  {
    "name": "Mark Posts",
    "slug": "mark-posts",
    "key": "markPosts",
    "fields": [
      "id",
      "post_Id",
      "user_id",
      "created_at"
    ]
  },
  {
    "name": "Post Reactions",
    "slug": "post-reactions",
    "key": "postReactions",
    "fields": [
      "id",
      "post_id",
      "reactor_id",
      "is_deleted",
      "created_at"
    ]
  },
  {
    "name": "Comment Reactions",
    "slug": "comment-reactions",
    "key": "commentReactions",
    "fields": [
      "id",
      "comment_id",
      "reactor_id",
      "is_deleted",
      "created_at"
    ]
  },
  {
    "name": "Donation Campaign",
    "slug": "donation-campaign",
    "key": "donationCampaign",
    "fields": [
      "id",
      "category_id",
      "description",
      "actual_amount",
      "targeted_amount",
      "donor_count",
      "start_date",
      "end_date",
      "status",
      "is_deleted"
    ]
  },
  {
    "name": "Job Announcement",
    "slug": "job-announcement",
    "key": "jobAnnouncement",
    "fields": [
      "id",
      "job_type",
      "company_name",
      "location",
      "contact_link",
      "status",
      "is_deleted"
    ]
  },
  {
    "name": "Skill",
    "slug": "skill",
    "key": "skill",
    "fields": [
      "id",
      "name",
      "description",
      "is_deleted",
      "created_at",
      "deleted_at"
    ]
  },
  {
    "name": "Event Announcement",
    "slug": "event-announcement",
    "key": "eventAnnouncement",
    "fields": [
      "id",
      "eventcate_id",
      "location",
      "start_date",
      "end_date",
      "limited_participant",
      "participant_count",
      "status",
      "is_deleted"
    ]
  },
  {
    "name": "Event Participants",
    "slug": "event-participants",
    "key": "eventParticipants",
    "fields": [
      "id",
      "event_id",
      "participant_id",
      "guest_type",
      "status",
      "registered_at"
    ]
  },
  {
    "name": "Event Category",
    "slug": "event-category",
    "key": "eventCategory",
    "fields": [
      "id",
      "name",
      "is_deleted",
      "created_at"
    ]
  },
  {
    "name": "BankAccountInfo",
    "slug": "bankaccountinfo",
    "key": "bankaccountinfo",
    "fields": [
      "bakong_account_id",
      "merchant_name",
      "merchant_city",
      "merchant_category_code"
    ]
  },
  {
    "name": "Campaign Category",
    "slug": "campaign-category",
    "key": "campaignCategory",
    "fields": [
      "id",
      "name",
      "is_deleted",
      "created_at",
      "deleted_at"
    ]
  },
  {
    "name": "Job Skills",
    "slug": "job-skills",
    "key": "jobSkills",
    "fields": [
      "job_id",
      "skill_names",
      "assigned_at"
    ]
  },
  {
    "name": "Donations",
    "slug": "donations",
    "key": "donations",
    "fields": [
      "id",
      "campaign_id",
      "dornor_id",
      "amount",
      "currency",
      "status",
      "is_anonymous",
      "is_deleted",
      "note",
      "created_at",
      "donated_at",
      "deleted_at"
    ]
  },
  {
    "name": "Payment Transactions Logs",
    "slug": "payment-transactions-logs",
    "key": "paymentTransactionsLogs",
    "fields": [
      "id",
      "qr_string",
      "amount",
      "currency",
      "bank",
      "raw_response",
      "status",
      "is_deleted",
      "created_at"
    ]
  },
  {
    "name": "TransactionQrHash",
    "slug": "transactionqrhash",
    "key": "transactionqrhash",
    "fields": [
      "qr_string",
      "md5",
      "fullHash"
    ]
  }
];
