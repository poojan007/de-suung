export class CreateEventModel {
    title: string;
    eventCategory_id: number;
    eventType_id: number;
    description: string;
    dzongkhag_id: number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    invited_from: number;
    invited_batch: number;
    coordinator_id: number;
    expected_working_days: number;
    total_desuup_required: number;
    attendance_assistant: number;
    createdBy: string;
    created_at: string;
}
