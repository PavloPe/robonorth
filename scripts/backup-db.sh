#!/bin/bash
# ============================================================================
# RoboNorth — Database Backup Script
# Copies the SQLite database file with a timestamp.
# Usage: ./scripts/backup-db.sh [backup_dir]
# ============================================================================

set -e

DB_FILE="prisma/dev.db"
BACKUP_DIR="${1:-backups}"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="${BACKUP_DIR}/robonorth-${TIMESTAMP}.db"

# Navigate to project root
cd "$(dirname "$0")/.."

if [ ! -f "$DB_FILE" ]; then
  echo "❌ Database file not found: $DB_FILE"
  exit 1
fi

# Create backup directory if needed
mkdir -p "$BACKUP_DIR"

# Copy with integrity check (use sqlite3 if available)
if command -v sqlite3 &> /dev/null; then
  echo "🔍 Running integrity check..."
  INTEGRITY=$(sqlite3 "$DB_FILE" "PRAGMA integrity_check;")
  if [ "$INTEGRITY" != "ok" ]; then
    echo "⚠️  Database integrity check failed: $INTEGRITY"
    echo "    Proceeding with backup anyway..."
  fi
fi

cp "$DB_FILE" "$BACKUP_FILE"

# Also copy WAL and SHM files if they exist
[ -f "${DB_FILE}-wal" ] && cp "${DB_FILE}-wal" "${BACKUP_FILE}-wal"
[ -f "${DB_FILE}-shm" ] && cp "${DB_FILE}-shm" "${BACKUP_FILE}-shm"

# Get file size
SIZE=$(du -h "$BACKUP_FILE" | cut -f1)

echo "✅ Backup created: $BACKUP_FILE ($SIZE)"

# Cleanup old backups (keep last 10)
BACKUP_COUNT=$(ls -1 "${BACKUP_DIR}"/robonorth-*.db 2>/dev/null | wc -l | tr -d ' ')
if [ "$BACKUP_COUNT" -gt 10 ]; then
  REMOVE_COUNT=$((BACKUP_COUNT - 10))
  echo "🧹 Removing $REMOVE_COUNT old backup(s)..."
  ls -1t "${BACKUP_DIR}"/robonorth-*.db | tail -n "$REMOVE_COUNT" | while read -r old; do
    rm -f "$old" "${old}-wal" "${old}-shm"
    echo "   Removed: $(basename "$old")"
  done
fi

echo "📊 Total backups: $(ls -1 "${BACKUP_DIR}"/robonorth-*.db 2>/dev/null | wc -l | tr -d ' ')"
