import { Router } from "express";
import { db } from "@workspace/db";
import { portalContent } from "@workspace/db";
import { eq } from "drizzle-orm";

const contentRouter = Router();

contentRouter.get("/content", async (req, res) => {
  try {
    const rows = await db.select().from(portalContent).where(eq(portalContent.id, "default"));
    if (rows.length === 0) {
      return res.json({ content: null });
    }
    return res.json({ content: rows[0].content, updatedAt: rows[0].updatedAt });
  } catch (err) {
    req.log.error(err, "Failed to fetch portal content");
    return res.status(500).json({ error: "Failed to fetch content" });
  }
});

contentRouter.put("/content", async (req, res) => {
  try {
    const { content } = req.body as { content: unknown };
    if (!content || typeof content !== "object" || Array.isArray(content)) {
      return res.status(400).json({ error: "Invalid content: must be an object" });
    }

    await db
      .insert(portalContent)
      .values({ id: "default", content: content as Record<string, unknown> })
      .onConflictDoUpdate({
        target: portalContent.id,
        set: {
          content: content as Record<string, unknown>,
          updatedAt: new Date(),
        },
      });

    return res.json({ success: true });
  } catch (err) {
    req.log.error(err, "Failed to update portal content");
    return res.status(500).json({ error: "Failed to update content" });
  }
});

export default contentRouter;
