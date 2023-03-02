export class Idea {
    constructor (
        writer_id,
        approver_id,
        post_date,
        approved_date,
        category,
        content,
        file,
        thread,
        visit_count,
        stat,
        is_anonymous
    ) {
        this.writer_id = writer_id;
        this.approver_id = approver_id;
        this.post_date = post_date;
        this.approved_date = approved_date;
        this.category = category;
        this.content = content;
        this.file = file;
        this.thread = thread;
        this.visit_count = visit_count;
        this.stat = stat;
        this.is_anonymous = is_anonymous;
    }

    static fromJson(json) {
        return new Idea(
            json.writer_id,
            json.approver_id,
            json.post_date,
            json.approved_date,
            json.category,
            json.content,
            json.file,
            json.thread,
            json.visit_count,
            json.stat,
            json.is_anonymous
        );
    }

    toJson() {
        return {
            writer_id: this.writer_id,
            approver_id: this.approver_id,
            post_date: this.post_date,
            approved_date: this.approved_date,
            category: this.category,
            content: this.content,
            file: this.file,
            thread: this.thread,
            visit_count: this.visit_count,
            stat: this.stat,
            is_anonymous: this.is_anonymous,
        };
    }

    toCSV() {
        return this.writer_id + "\t" + this.approver_id + "\t" + this.post_date + "\t"
            + this.approved_date + "\t"
            + this.category + "\t"
            + this.content + "\t"
            + (this.file === undefined || this.file === "" ? "No files attached" : this.file) + "\t"
            + this.thread + "\t"
            + this.visit_count + "\t"
            + this.stat + "\t"
            + this.is_anonymous + "\n"
    }

}

const idea_status = ["Open", "Closed", "Expired"];
