import sqlite3
from datetime import datetime

# Initialize SQLite database
def initialize_database():
    conn = sqlite3.connect('incident_reports.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS incidents
                      (id INTEGER PRIMARY KEY,
                      timestamp TEXT,
                      category TEXT,
                      description TEXT,
                      reporter TEXT)''')
    conn.commit()
    conn.close()

# Submit incident report
def submit_incident(category, description, reporter):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    conn = sqlite3.connect('incident_reports.db')
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO incidents (timestamp, category, description, reporter)
                      VALUES (?, ?, ?, ?)''', (timestamp, category, description, reporter))
    conn.commit()
    conn.close()

# View all incident reports
def view_incidents():
    conn = sqlite3.connect('incident_reports.db')
    cursor = conn.cursor()
    cursor.execute('''SELECT * FROM incidents''')
    incidents = cursor.fetchall()
    conn.close()
    return incidents

# User interface
def main():
    initialize_database()

    while True:
        print("\nIncident Reporting Tool")
        print("1. Report an Incident")
        print("2. View All Incidents")
        print("3. Exit")
        choice = input("Enter your choice: ")

        if choice == '1':
            category = input("Enter the category of incident: ")
            description = input("Enter a brief description: ")
            reporter = input("Your name: ")
            submit_incident(category, description, reporter)
            print("Incident reported successfully!")

        elif choice == '2':
            incidents = view_incidents()
            print("\nAll Incidents:")
            for incident in incidents:
                print(f"ID: {incident[0]}, Timestamp: {incident[1]}, Category: {incident[2]}, Description: {incident[3]}, Reporter: {incident[4]}")

        elif choice == '3':
            print("Exiting...")
            break

        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
