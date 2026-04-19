export const mockMaintenance = [
  {
    "id": "MAINT-2026-0008",
    "type": "ALTERATION_AMENDMENT",
    "trademark_id": "TM-2026-001",
    "trademark_name": "COCA-COLA",
    "applicant_id": "u007",
    "fields_amended": [
      {
        "field": "manufacturer_address",
        "old_value": "One Coca-Cola Plaza, Atlanta, USA",
        "new_value": "One Coca-Cola Plaza, Atlanta, Georgia 30313, USA"
      },
      {
        "field": "licensees",
        "old_value": "2 licensees",
        "new_value": "Added: Kilimanjaro Beverages Ltd, Moshi, Tanzania"
      }
    ],
    "status": "APPROVED",
    "submitted_date": "2026-03-25",
    "payment_required": false,
    "acem_decision": "APPROVE",
    "acem_decision_date": "2026-03-29",
    "confirmation_email_sent": true,
    "audit_trail": [
      {
        "timestamp": "2026-03-25T09:00:00Z",
        "user": "u007",
        "user_name": "Coca-Cola Kwanza",
        "action": "AMENDMENT_SUBMITTED",
        "note": "Minor address amendment and new licensee addition."
      },
      {
        "timestamp": "2026-03-29T11:00:00Z",
        "user": "u003",
        "user_name": "Bernard Okello (ACEM)",
        "action": "ACEM_APPROVED",
        "note": "Non-ownership amendment approved directly. Register updated."
      }
    ]
  },
  {
    "id": "MAINT-2026-0005",
    "type": "CHANGE_OF_OWNERSHIP",
    "trademark_id": "TM-2026-007",
    "trademark_name": "KILIMO FRESH",
    "applicant_id": "u007",
    "form_type": "FCC_FORM_2",
    "old_owner": "Kilimo Fresh Agro Products Ltd",
    "new_owner": "Kilimo Holdings Tanzania Ltd",
    "new_owner_address": "Arusha City, Kilimanjaro Region, Tanzania",
    "status": "UNDER_REVIEW",
    "submitted_date": "2026-04-05",
    "payment_amount_tzs": 150000,
    "gepg_control_no": "GEPG-2026-91200",
    "payment_status": "PAID",
    "documents": [
      {
        "type": "UPDATED_REGISTRATION_CERTIFICATE",
        "filename": "KilimoFresh-OwnerChange-BRE-2026.pdf",
        "verified": false
      },
      {
        "type": "ASSIGNMENT_DEED",
        "filename": "Assignment-KilimoFresh-2026.pdf",
        "verified": false
      }
    ],
    "tro_recommendation": null,
    "brela_verified": false,
    "audit_trail": [
      {
        "timestamp": "2026-04-05T10:00:00Z",
        "user": "u007",
        "user_name": "Coca-Cola Kwanza East Africa Ltd",
        "action": "OWNERSHIP_CHANGE_SUBMITTED",
        "note": "Application submitted with Form FCC 2 and supporting documents."
      }
    ]
  },
  {
    "id": "MAINT-2026-0003",
    "type": "CHANGE_OF_NAME",
    "trademark_id": "TM-2026-003",
    "trademark_name": "AZAM",
    "applicant_id": "u008",
    "old_name": "Said Salim Bakhresa & Co Ltd",
    "new_name": "Bakhresa Food Products Ltd",
    "status": "APPROVED",
    "submitted_date": "2026-02-10",
    "payment_amount_tzs": 100000,
    "gepg_control_no": "GEPG-2026-33871",
    "payment_status": "PAID",
    "documents": [
      {
        "type": "UPDATED_REGISTRATION_CERTIFICATE",
        "filename": "Bakhresa-NameChange-BRE-2026.pdf",
        "verified": true
      }
    ],
    "tro_recommendation": "APPROVE",
    "brela_verified": true,
    "acem_decision": "APPROVE",
    "ci_decision": "APPROVE",
    "new_certificate_issued": "FCC-NAME-2026-003",
    "audit_trail": [
      {
        "timestamp": "2026-02-10T10:00:00Z",
        "user": "u008",
        "user_name": "Advocate Paul Kimaro",
        "action": "NAME_CHANGE_SUBMITTED",
        "note": "Company name changed per BRELA certificate."
      },
      {
        "timestamp": "2026-02-20T09:00:00Z",
        "user": "u001",
        "user_name": "Dr. James Mwangi (CI)",
        "action": "CI_APPROVED",
        "note": "Name change approved. New certificate issued."
      }
    ]
  }
];
