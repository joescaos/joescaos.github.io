import type { BlogPost, Author } from '../types/blog.types'

const author: Author = {
  name: 'Johan Cañas',
  role: { en: 'Software Engineer', es: 'Ingeniero de Software' },
  avatarUrl: '/portfolio_photo.jpeg',
}

const JAVA_THREADS_CONTENT = `# The Evolution of Java Threads: From Simple to Revolutionary

## Introduction: What Are Threads and Why Should You Care?

Imagine your computer is like a restaurant. A single-threaded program is like having just one waiter serving all the customers—they have to finish with one table before moving to the next. Multi-threading is like hiring multiple waiters who can serve different tables simultaneously. This is essentially what Java threads do: they allow your programs to do multiple things at the same time, making applications faster and more responsive.

For over 25 years, Java has been helping developers write programs that can handle many tasks at once. But the tools available for threading have evolved dramatically. This journey shows how Java continuously improved to make threading easier, safer, and more efficient.

---

## Chapter 1: The Beginning — Runnable (1995)

**The Story:** When Java was born in 1995, threading was revolutionary. The language came with a built-in threading model, which was rare and powerful for its time.

**What Was Introduced: \`Runnable\`**

\`Runnable\` is the most basic building block for threading in Java. It's a simple contract that says: "I have some work to do."

\`\`\`java
// The simple interface
public interface Runnable {
    void run();
}

// Creating a thread
Thread thread = new Thread(() -> {
    System.out.println("I'm running in a separate thread!");
});
thread.start();
\`\`\`

**Why It Mattered:** For the first time, developers could write concurrent programs in a mainstream language with relative ease. You could spawn multiple threads and let them run in parallel.

**The Limitation:** Runnable could only do work—it couldn't return results, couldn't report errors properly, and had no way to communicate back to the caller about what happened.

---

## Chapter 2: The Callback Era — Callable & Future (Java 5, 2004)

**The Story:** By the early 2000s, developers realized they needed more. They wanted to start a task on a separate thread and later get the result back. This led to a major evolution in Java's threading model.

**What Was Introduced: \`Callable\` and \`Future\`**

Instead of just doing work, \`Callable\` is a task that can return a result:

\`\`\`java
// Callable returns a result
Callable<String> task = () -> {
    // Do some work
    return "Here's the result!";
};

// ExecutorService manages threads for you
ExecutorService executor = Executors.newFixedThreadPool(4);

// Submit the task and get back a Future
Future<String> future = executor.submit(task);

// Later, get the result (this blocks until it's ready)
String result = future.get();
\`\`\`

**Why It Mattered:** This introduced the concept of **fire-and-forget with retrieval**. You could start a task and continue with other work, then come back later to get the result.

**The Real Innovation: \`ExecutorService\`**

Instead of creating threads manually (which is expensive and error-prone), you now had a thread pool manager. Think of it like a restaurant hiring a manager to intelligently assign waiters to customers, rather than each waiter managing themselves.

**The Limitation:** If you needed to combine multiple async operations, chain them, or handle failures elegantly, \`Future\` became awkward and hard to read.

---

## Chapter 3: The Reactive Revolution — CompletableFuture (Java 8, 2014)

**The Story:** By 2014, the world had changed. Asynchronous programming was becoming essential due to the rise of web services and cloud computing. Node.js and other languages had shown elegant patterns for handling asynchronous code. Java needed to catch up.

**What Was Introduced: \`CompletableFuture\`**

\`CompletableFuture\` is like \`Future\` on steroids. It lets you chain operations together in a clean, readable way:

\`\`\`java
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return "Hello";
})
.thenApply(result -> result + " World")
.thenApply(String::toUpperCase)
.thenAccept(System.out::println);  // Prints: HELLO WORLD

// You can also handle errors
future.exceptionally(throwable -> {
    System.out.println("Something went wrong: " + throwable.getMessage());
    return "Default value";
});
\`\`\`

**Why It Mattered:** This solved the "callback hell" problem. Instead of nesting functions within functions (which becomes hard to read), you could write a clear pipeline of operations. It's like describing a recipe step-by-step instead of writing it all in one complicated sentence.

**Key Features:**

- **Chaining (thenApply):** Transform results as they flow through
- **Combining:** Merge multiple async operations together
- **Error Handling:** Handle failures gracefully with exceptionally()
- **Execution Control:** Combine operations from different executor services

**The Limitation:** Even with \`CompletableFuture\`, there was still a fundamental problem with Java's threading model that nobody could solve—the cost of creating and managing threads.

---

## Chapter 4: The Platform Threads Era (Java 1995-2020)

**The Challenge Behind the Scenes:**

For 25 years, Java used "platform threads" (also called OS threads). Here's the problem:

- Creating a thread costs memory (about 1 MB per thread)
- If you wanted to handle 10,000 concurrent users, you'd need 10,000 threads
- That's 10 GB of memory just for the threads!
- Context switching between thousands of threads is expensive

\`\`\`
Traditional Threading Model:
1 Thread = 1 OS Thread
10,000 Users = 10,000 OS Threads = Memory & CPU Nightmare
\`\`\`

Developers had to create thread pools and carefully manage their size. If you had too few threads, users would wait. If you had too many, the system would slow down.

---

## Chapter 5: The Virtual Threads Revolution (Java 19-21, 2022-2023)

**The Story:** In 2022, Java introduced something game-changing: **Virtual Threads**. This is the most significant threading improvement in decades.

**What Are Virtual Threads?**

Virtual threads are lightweight. They're like a web server that can handle thousands of concurrent users with just a few actual OS threads underneath.

\`\`\`
Virtual Threads Model:
Many Virtual Threads = Few OS Threads (typically one per CPU core)
10,000 Users = 10,000 Virtual Threads = Only ~8-16 OS Threads
Result: 10,000 times lighter and 10,000 times more flexible!
\`\`\`

**How It Works (Simplified):**

Imagine 10,000 waiters (virtual threads) working in a restaurant, but only 4 physical people (OS threads) actually do the work. When a waiter is waiting for a customer to decide what to order, they step aside, and another waiter takes over the physical person. This is called "yielding" or "parking."

**Creating a Virtual Thread:**

\`\`\`java
// The simple way - using ExecutorService
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

for (int i = 0; i < 10000; i++) {
    executor.submit(() -> {
        // Each task runs in a virtual thread
        System.out.println("Hello from virtual thread!");
    });
}

// Or directly with Thread API
Thread virtualThread = Thread.ofVirtual()
    .name("my-virtual-thread")
    .start(() -> {
        System.out.println("I'm a virtual thread!");
    });
\`\`\`

**Why It's Revolutionary:**

1. **Massive Scalability:** Handle millions of concurrent tasks with minimal resources
2. **Simplicity:** Write code as if each user has their own thread—no need for complex async patterns
3. **Debugging:** Virtual threads work with all existing debugging and profiling tools
4. **Performance:** Significantly better than traditional thread pools for I/O-heavy applications

**Real-World Impact:**

A web server that previously could handle 1,000 concurrent users with careful tuning can now handle 100,000 users with the same code, just using virtual threads instead of platform threads.

---

## The Complete Timeline at a Glance

| Year | Feature | What It Solved | Limitation |
|------|---------|-----------------|------------|
| 1995 | \`Runnable\` | Basic threading | No result return |
| 2004 | \`Callable\`, \`Future\` | Returning results | Awkward for chaining |
| 2004 | \`ExecutorService\` | Thread pool management | Still used platform threads |
| 2014 | \`CompletableFuture\` | Async chaining & composition | Still expensive to create threads |
| 2023 | Virtual Threads | Lightweight, scalable concurrency | None (arguably!) |

---

## Which Should You Use?

**Choose \`Runnable\` if:** You're learning Java basics or writing simple background tasks (rarely used today)

**Choose \`Callable\` + \`Future\` if:** You need basic thread pooling for a small number of concurrent tasks

**Choose \`CompletableFuture\` if:** You're combining multiple async operations or need non-blocking code with good composability

**Choose Virtual Threads if:** You're building modern applications, especially web services, APIs, or anything handling many concurrent users (this is the future!)

---

## The Bigger Picture: Why This Evolution Matters

Each improvement in Java's threading model solved real problems that developers faced:

- **Runnable** made threading accessible to everyone
- **Callable & ExecutorService** made threading safe with thread pools
- **CompletableFuture** made async code readable
- **Virtual Threads** made concurrent scaling simple and efficient

This evolution mirrors how Java itself works: it takes ideas from the world around it, improves them thoughtfully, and gives developers powerful, productive tools.

---

## Looking Forward

Virtual threads are stabilized and production-ready in Java 21+. They represent a fundamental shift in how we think about concurrency:

- **Before:** "How many threads can we safely create?"
- **After:** "Create as many virtual threads as you need; Java will manage the OS threads efficiently."

The journey from \`Runnable\` to virtual threads shows how language evolution isn't just about adding features—it's about solving real human problems with elegant, practical solutions.

---

## Conclusion

Java's threading story is one of continuous improvement. From the simple one-task-at-a-time model with \`Runnable\`, through the callback complexity of early async, to the elegant chains of \`CompletableFuture\`, and finally to the revolutionary lightness of virtual threads—each step made Java better for building real-world applications.

If you're learning Java in 2024, you're in the best time: virtual threads make concurrent programming simpler and more accessible than ever before. If you're maintaining legacy code, understanding this evolution helps you appreciate why different parts of your codebase were written the way they were.

The bottom line? Java's threading evolution is a master class in how language design should work: listen to developers, solve real problems, and keep making things better.
`

const JAVA_CONCURRENCY_CONTENT = `# Java Concurrency Concepts: Mastering Thread Safety and Synchronization

## Introduction: Why We Need These Tools

Imagine a single bathroom in an office with 100 employees. Without rules, chaos would ensue—multiple people trying to enter simultaneously, locks breaking, people pushing each other. Concurrency concepts are the "rules and locks" that prevent this chaos in multi-threaded programs.

When multiple threads try to access the same resource (like data in memory), bad things can happen:
- Two threads might read the same value and both update it, causing one update to be lost
- One thread might see partial updates from another thread (corrupted data)
- Threads might wait forever for something that will never happen

This guide explores the tools Java provides to coordinate threads safely and efficiently. These are among the most powerful—and most misunderstood—tools in Java.

---

## Part 1: The Foundation — Monitors and Synchronized

### What's a Monitor?

A **monitor** is a concept in concurrent programming that comes from the 1970s. Think of it as a "protected room" that only one thread can enter at a time.

In Java, the built-in monitor mechanism is called **\`synchronized\`**:

\`\`\`java
// Using synchronized on a method
public synchronized void updateBalance(double amount) {
    balance = balance + amount;
}

// Only one thread can execute this at a time
// Other threads have to wait outside
\`\`\`

**The Real-World Analogy:**

Imagine a bank teller's window with a "one at a time" rule:
- Only one customer can be at the window
- Others wait in line
- When one customer finishes, the next one enters
- This prevents two customers from accessing your account simultaneously

### How Monitors Work

Every object in Java is a monitor. When you use \`synchronized\`:

\`\`\`java
public class BankAccount {
    private double balance = 1000;

    public synchronized void withdraw(double amount) {
        if (balance >= amount) {
            balance = balance - amount;
        }
    }
}
\`\`\`

Behind the scenes:
1. A thread tries to execute the method
2. If no other thread is in a synchronized block on this object, it enters
3. All other threads wait in a queue (called the "entry set")
4. When the thread exits, one waiting thread gets its turn

### The Lock (Implicit Monitor Lock)

Every Java object has an implicit lock (also called a monitor lock):

\`\`\`java
Object lock = new Object();

synchronized(lock) {
    // Only one thread at a time can be here
}
\`\`\`

**Limitations of Synchronized:**

- **Coarse-grained:** Locks the entire object or method
- **No waiting with timeout:** If a thread needs the lock, it waits indefinitely
- **No fairness guarantees:** Any thread might get the lock next
- **No way to check if lock is available:** You either get it or wait

---

## Part 2: The Lock Interface — Fine-Grained Control

### Introduction to Lock

In Java 5, the \`Lock\` interface was introduced to solve \`synchronized\`'s limitations:

\`\`\`java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

Lock lock = new ReentrantLock();

lock.lock();
try {
    balance = balance + amount;
} finally {
    lock.unlock();
}
\`\`\`

### Types of Locks

**1. ReentrantLock — The Standard Lock**

\`\`\`java
Lock lock = new ReentrantLock();

if (lock.tryLock(5, TimeUnit.SECONDS)) {
    try {
        // Do protected work
    } finally {
        lock.unlock();
    }
} else {
    System.out.println("Couldn't acquire lock after 5 seconds");
}
\`\`\`

**Key Features:**
- \`lock()\` - Wait indefinitely
- \`tryLock()\` - Try once without waiting
- \`tryLock(time, unit)\` - Try with a timeout
- \`unlock()\` - Release the lock
- Fair/unfair modes: You can specify fairness (first-come, first-served)

**2. ReadWriteLock — Optimize for Readers**

\`\`\`java
ReadWriteLock lock = new ReentrantReadWriteLock();

// Many threads can read simultaneously
lock.readLock().lock();
try {
    double currentBalance = balance;
    return currentBalance;
} finally {
    lock.readLock().unlock();
}

// Writing is exclusive
lock.writeLock().lock();
try {
    balance = balance + amount;
} finally {
    lock.writeLock().unlock();
}
\`\`\`

**3. StampedLock — Optimistic Locking**

\`\`\`java
StampedLock lock = new StampedLock();

long stamp = lock.tryOptimisticRead();
double value = balance;

if (!lock.validate(stamp)) {
    stamp = lock.readLock();
    try {
        value = balance;
    } finally {
        lock.unlockRead(stamp);
    }
}
\`\`\`

**When to Use Each Lock:**

| Lock Type | Best For | Advantage |
|-----------|----------|-----------|
| \`synchronized\` | Simple cases | Built-in, no imports needed |
| \`ReentrantLock\` | Need timeout or fairness | More control than synchronized |
| \`ReadWriteLock\` | Many readers, few writers | Better performance for read-heavy workloads |
| \`StampedLock\` | Ultra-high concurrency | Most performant, but harder to use |

---

## Part 3: Coordination Tools — Synchronizing Multiple Threads

### Semaphore — Counting Access

A **semaphore** is like a parking lot with a limited number of spaces:

\`\`\`java
Semaphore parkingLot = new Semaphore(3);

void enterParking() {
    parkingLot.acquire();
    try {
        useParking();
    } finally {
        parkingLot.release();
    }
}
\`\`\`

**Practical Example:**

\`\`\`java
Semaphore dbConnections = new Semaphore(10);

public void executeQuery(String sql) throws InterruptedException {
    dbConnections.acquire();
    try {
        database.query(sql);
    } finally {
        dbConnections.release();
    }
}
\`\`\`

---

### CountDownLatch — Wait for Multiple Events

A **CountDownLatch** is a one-way gate that opens when a countdown reaches zero:

\`\`\`java
CountDownLatch latch = new CountDownLatch(3);

for (int i = 0; i < 3; i++) {
    new Thread(() -> {
        try {
            doSomeWork();
        } finally {
            latch.countDown();
        }
    }).start();
}

latch.await();
System.out.println("All workers completed!");
\`\`\`

**Practical Example: Parallel Data Processing**

\`\`\`java
public class DataProcessor {
    public void processData(List<DataChunk> chunks) throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(chunks.size());

        for (DataChunk chunk : chunks) {
            executor.submit(() -> {
                try {
                    processChunk(chunk);
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        System.out.println("All chunks processed!");
    }
}
\`\`\`

---

### CyclicBarrier — Synchronization Point

A **CyclicBarrier** waits until a specified number of threads have all arrived, then releases them together:

\`\`\`java
CyclicBarrier barrier = new CyclicBarrier(3, () -> {
    System.out.println("All threads met at the barrier!");
});

new Thread(() -> {
    doWork();
    barrier.await();
    System.out.println("Proceeding after barrier");
}).start();
\`\`\`

**CountDownLatch vs CyclicBarrier:**

| Feature | CountDownLatch | CyclicBarrier |
|---------|----------------|---------------|
| Direction | One-way | Reusable |
| Reset | No (one-time) | Yes (resets automatically) |
| Trigger | Task completion | All threads arrive |
| Use Case | Wait for setup | Synchronized steps |

**Multi-Phase Processing:**

\`\`\`java
public class GameRound {
    public void playRound(List<Player> players) throws Exception {
        CyclicBarrier roundBarrier = new CyclicBarrier(players.size());

        for (Player player : players) {
            executor.submit(() -> {
                while (gameActive) {
                    player.makeMove();
                    roundBarrier.await();
                    processAllMoves();
                    roundBarrier.await();
                }
            });
        }
    }
}
\`\`\`

---

## Part 4: Memory Visibility — The Volatile Keyword

### The Problem

\`\`\`java
public class Flag {
    private boolean ready = false;
    private int value = 0;

    public void setValue(int v) {
        value = v;
        ready = true;
    }
}
\`\`\`

Without proper synchronization, Thread 2 might never see the updated \`value\`, or get stuck in a busy-wait loop because the compiler cached the old read.

### The Solution: Volatile

\`\`\`java
public class Flag {
    private volatile boolean ready = false;
    private volatile int value = 0;
}
\`\`\`

**What \`volatile\` Does:**

- **Visibility:** Guarantees that writes are visible to all threads immediately
- **Ordering:** Prevents the compiler from reordering memory operations
- **No Atomicity:** It does not make compound operations atomic

\`\`\`java
// This is still NOT atomic!
volatile int counter = 0;
counter++;  // read-modify-write: 3 separate operations
\`\`\`

---

## Part 5: Atomic Operations — Thread-Safe Numbers

\`\`\`java
import java.util.concurrent.atomic.AtomicInteger;

AtomicInteger counter = new AtomicInteger(0);

counter.incrementAndGet();
counter.getAndAdd(5);
counter.compareAndSet(10, 20);
\`\`\`

**Available Atomic Classes:**

\`\`\`java
AtomicInteger        // For int
AtomicLong           // For long
AtomicBoolean        // For boolean
AtomicReference<T>   // For any object
AtomicIntegerArray   // Array of ints
\`\`\`

**Safe Counter:**

\`\`\`java
public class SafeCounter {
    private AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet();  // No synchronization needed!
    }

    public int getValue() {
        return count.get();
    }
}
\`\`\`

---

## Part 6: Thread-Local Storage — Isolation

\`\`\`java
public class DatabaseConnection {
    private static ThreadLocal<Connection> connectionHolder =
        ThreadLocal.withInitial(() -> createConnection());

    public static Connection getConnection() {
        return connectionHolder.get();
    }

    public static void cleanup() {
        connectionHolder.remove();  // Prevent memory leaks!
    }
}
\`\`\`

**Common Uses:**
- Database connections per thread
- Session data in web applications
- Transaction context
- Formatting utilities (e.g., \`SimpleDateFormat\`)

---

## Part 7: The Complete Concurrency Toolkit

### Quick Reference Table

| Concept | Purpose | Threads Involved | Use Case |
|---------|---------|-----------------|----------|
| \`synchronized\` | Mutual exclusion | 1 at a time | Simple protected sections |
| \`ReentrantLock\` | Mutual exclusion (advanced) | 1 at a time | When you need timeouts |
| \`Semaphore\` | Resource limiting | Up to N | Connection pools, rate limiting |
| \`CountDownLatch\` | Wait for events | N → 0 | Initialization, waiting for completion |
| \`CyclicBarrier\` | Synchronization point | N threads | Multi-phase processing |
| \`volatile\` | Memory visibility | Many | Flag variables |
| \`AtomicInteger\` | Atomic operations | Many | Counters without locks |
| \`ThreadLocal\` | Thread isolation | Isolated | Per-thread state |

---

## Part 8: Common Mistakes and Best Practices

### Mistake 1: Forgetting to Release a Lock

\`\`\`java
// WRONG - Lock might never be released if exception occurs
Lock lock = new ReentrantLock();
lock.lock();
someMethod();
lock.unlock();

// CORRECT
Lock lock = new ReentrantLock();
lock.lock();
try {
    someMethod();
} finally {
    lock.unlock();
}
\`\`\`

### Mistake 2: Mixing volatile with Compound Operations

\`\`\`java
// WRONG - Not atomic even with volatile
volatile int count = 0;
count++;

// CORRECT
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();
\`\`\`

### Mistake 3: Over-Synchronizing

\`\`\`java
// WRONG - Locks for too long
synchronized void processList(List<Item> items) {
    for (Item item : items) {
        processItem(item);  // Slow work done inside lock
    }
}

// CORRECT - Lock only what you need
void processList(List<Item> items) {
    for (int i = 0; i < items.size(); i++) {
        Item itemToProcess;
        synchronized(items) {
            itemToProcess = items.get(i);
        }
        processItem(itemToProcess);
    }
}
\`\`\`

### Best Practices

1. **Prefer high-level tools:** Use \`CountDownLatch\`, \`CyclicBarrier\`, \`Semaphore\` over raw locks
2. **Keep critical sections small:** Minimize time spent holding locks
3. **Use try-finally:** Always release locks in finally blocks
4. **Consider immutability:** The best synchronization is no sharing at all
5. **Profile before optimizing:** Don't use \`StampedLock\` unless you've measured the bottleneck

---

## Part 9: Real-World Examples

### Thread-Safe Resource Pool

\`\`\`java
public class ConnectionPool {
    private final Queue<Connection> available = new LinkedList<>();
    private final Semaphore semaphore;
    private final Lock lock = new ReentrantLock();

    public ConnectionPool(int maxConnections) {
        this.semaphore = new Semaphore(maxConnections);
        for (int i = 0; i < maxConnections; i++) {
            available.offer(createConnection());
        }
    }

    public Connection getConnection() throws InterruptedException {
        semaphore.acquire();
        lock.lock();
        try {
            return available.poll();
        } finally {
            lock.unlock();
        }
    }

    public void returnConnection(Connection conn) {
        lock.lock();
        try {
            available.offer(conn);
        } finally {
            lock.unlock();
        }
        semaphore.release();
    }
}
\`\`\`

### Read-Heavy Data Store

\`\`\`java
public class CachedUserStore {
    private final Map<Integer, User> users = new HashMap<>();
    private final ReadWriteLock lock = new ReentrantReadWriteLock();

    public User getUser(int id) {
        lock.readLock().lock();
        try {
            return users.get(id);
        } finally {
            lock.readLock().unlock();
        }
    }

    public void updateUser(User user) {
        lock.writeLock().lock();
        try {
            users.put(user.getId(), user);
        } finally {
            lock.writeLock().unlock();
        }
    }
}
\`\`\`

---

## Conclusion: Choosing Your Tools Wisely

Java's concurrency toolkit has evolved over two decades to provide solutions at different levels:

- **Low-level:** Synchronization primitives (monitors, locks)
- **Mid-level:** Coordination tools (semaphores, latches, barriers)
- **High-level:** Memory visibility (volatile, atomic classes)
- **Specialized:** Thread isolation (ThreadLocal)

Understanding when each tool applies is the difference between code that is safe under load and code that fails in production in subtle, hard-to-reproduce ways.

**Master these concepts, and you'll write code that's safe, fast, and reliable.**
`

const JAVA_THREADS_CONTENT_ES = `# La Evolución de los Threads en Java: De lo Simple a lo Revolucionario

## Introducción: ¿Qué son los Threads y Por Qué Importan?

Imagina que tu computadora es como un restaurante. Un programa de un solo hilo es como tener un único mesero atendiendo a todos los clientes—debe terminar con una mesa antes de pasar a la siguiente. El multi-threading es como contratar varios meseros que pueden atender diferentes mesas simultáneamente. Esto es esencialmente lo que hacen los threads de Java: permiten que tus programas hagan múltiples cosas al mismo tiempo, haciendo las aplicaciones más rápidas y responsivas.

Por más de 25 años, Java ha ayudado a los desarrolladores a escribir programas que pueden manejar muchas tareas a la vez. Pero las herramientas disponibles para el threading han evolucionado dramáticamente. Este recorrido muestra cómo Java mejoró continuamente para hacer el threading más fácil, seguro y eficiente.

---

## Capítulo 1: El Comienzo — Runnable (1995)

**La Historia:** Cuando Java nació en 1995, el threading era revolucionario. El lenguaje venía con un modelo de threading incorporado, algo raro y poderoso para su época.

**Qué se Introdujo: \`Runnable\`**

\`Runnable\` es el bloque de construcción más básico para el threading en Java. Es un contrato simple que dice: "Tengo trabajo que hacer."

\`\`\`java
// La interfaz simple
public interface Runnable {
    void run();
}

// Creando un thread
Thread thread = new Thread(() -> {
    System.out.println("¡Estoy ejecutándome en un thread separado!");
});
thread.start();
\`\`\`

**Por Qué Importó:** Por primera vez, los desarrolladores podían escribir programas concurrentes en un lenguaje de uso masivo con relativa facilidad. Podías crear múltiples threads y dejarlos correr en paralelo.

**La Limitación:** Runnable solo podía ejecutar trabajo—no podía retornar resultados, no podía reportar errores apropiadamente, y no tenía forma de comunicarle al invocador qué había sucedido.

---

## Capítulo 2: La Era de los Callbacks — Callable & Future (Java 5, 2004)

**La Historia:** Para principios de los 2000, los desarrolladores se dieron cuenta de que necesitaban más. Querían iniciar una tarea en un thread separado y luego obtener el resultado. Esto llevó a una evolución mayor en el modelo de threading de Java.

**Qué se Introdujo: \`Callable\` y \`Future\`**

En lugar de solo hacer trabajo, \`Callable\` es una tarea que puede retornar un resultado:

\`\`\`java
// Callable retorna un resultado
Callable<String> task = () -> {
    // Hacer algún trabajo
    return "¡Aquí está el resultado!";
};

// ExecutorService administra los threads por ti
ExecutorService executor = Executors.newFixedThreadPool(4);

// Enviar la tarea y recibir un Future
Future<String> future = executor.submit(task);

// Luego, obtener el resultado (bloquea hasta que esté listo)
String result = future.get();
\`\`\`

**Por Qué Importó:** Esto introdujo el concepto de **disparar-y-olvidar con recuperación**. Podías iniciar una tarea y continuar con otro trabajo, para luego regresar a obtener el resultado.

**La Innovación Real: \`ExecutorService\`**

En lugar de crear threads manualmente (lo cual es costoso y propenso a errores), ahora tenías un administrador de pool de threads. Piénsalo como un restaurante que contrata un gerente para asignar meseros a los clientes inteligentemente, en lugar de que cada mesero se administre a sí mismo.

**La Limitación:** Si necesitabas combinar múltiples operaciones asíncronas, encadenarlas o manejar fallas elegantemente, \`Future\` se volvía incómodo y difícil de leer.

---

## Capítulo 3: La Revolución Reactiva — CompletableFuture (Java 8, 2014)

**La Historia:** Para 2014, el mundo había cambiado. La programación asíncrona se estaba volviendo esencial debido al auge de los servicios web y la computación en la nube. Node.js y otros lenguajes habían mostrado patrones elegantes para manejar código asíncrono. Java necesitaba ponerse al día.

**Qué se Introdujo: \`CompletableFuture\`**

\`CompletableFuture\` es como \`Future\` con superpoderes. Permite encadenar operaciones de forma limpia y legible:

\`\`\`java
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return "Hola";
})
.thenApply(result -> result + " Mundo")
.thenApply(String::toUpperCase)
.thenAccept(System.out::println);  // Imprime: HOLA MUNDO

// También puedes manejar errores
future.exceptionally(throwable -> {
    System.out.println("Algo salió mal: " + throwable.getMessage());
    return "Valor por defecto";
});
\`\`\`

**Por Qué Importó:** Esto resolvió el problema del "callback hell". En lugar de anidar funciones dentro de funciones (lo que se vuelve difícil de leer), podías escribir un pipeline claro de operaciones. Es como describir una receta paso a paso en lugar de escribirla toda en una oración complicada.

**Características Clave:**

- **Encadenamiento (thenApply):** Transformar resultados a medida que fluyen
- **Combinación:** Fusionar múltiples operaciones asíncronas
- **Manejo de Errores:** Manejar fallas elegantemente con exceptionally()
- **Control de Ejecución:** Combinar operaciones de diferentes ExecutorServices

**La Limitación:** Incluso con \`CompletableFuture\`, seguía habiendo un problema fundamental con el modelo de threading de Java que nadie podía resolver—el costo de crear y administrar threads.

---

## Capítulo 4: La Era de los Platform Threads (Java 1995-2020)

**El Desafío Detrás de Escena:**

Por 25 años, Java usó "platform threads" (también llamados OS threads). El problema:

- Crear un thread cuesta memoria (aproximadamente 1 MB por thread)
- Si querías manejar 10,000 usuarios concurrentes, necesitabas 10,000 threads
- ¡Eso es 10 GB de memoria solo para los threads!
- El cambio de contexto entre miles de threads es costoso

\`\`\`
Modelo de Threading Tradicional:
1 Thread = 1 OS Thread
10,000 Usuarios = 10,000 OS Threads = Pesadilla de Memoria y CPU
\`\`\`

Los desarrolladores tenían que crear pools de threads y administrar cuidadosamente su tamaño. Si tenías muy pocos threads, los usuarios esperaban. Si tenías demasiados, el sistema se ralentizaba.

---

## Capítulo 5: La Revolución de los Virtual Threads (Java 19-21, 2022-2023)

**La Historia:** En 2022, Java introdujo algo revolucionario: **Virtual Threads**. Esta es la mejora de threading más significativa en décadas.

**¿Qué son los Virtual Threads?**

Los virtual threads son ligeros. Son como un servidor web que puede manejar miles de usuarios concurrentes con solo unos pocos OS threads reales por debajo.

\`\`\`
Modelo de Virtual Threads:
Muchos Virtual Threads = Pocos OS Threads (típicamente uno por núcleo de CPU)
10,000 Usuarios = 10,000 Virtual Threads = Solo ~8-16 OS Threads
¡Resultado: 10,000 veces más ligero y 10,000 veces más flexible!
\`\`\`

**Cómo Funciona (Simplificado):**

Imagina 10,000 meseros (virtual threads) trabajando en un restaurante, pero solo 4 personas físicas (OS threads) hacen el trabajo real. Cuando un mesero está esperando que un cliente decida qué pedir, se hace a un lado, y otro mesero toma a la persona física. Esto se llama "yielding" o "parking."

**Creando un Virtual Thread:**

\`\`\`java
// La forma simple - usando ExecutorService
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

for (int i = 0; i < 10000; i++) {
    executor.submit(() -> {
        // Cada tarea corre en un virtual thread
        System.out.println("¡Hola desde un virtual thread!");
    });
}

// O directamente con la API de Thread
Thread virtualThread = Thread.ofVirtual()
    .name("mi-virtual-thread")
    .start(() -> {
        System.out.println("¡Soy un virtual thread!");
    });
\`\`\`

**Por Qué es Revolucionario:**

1. **Escalabilidad Masiva:** Maneja millones de tareas concurrentes con recursos mínimos
2. **Simplicidad:** Escribe código como si cada usuario tuviera su propio thread—sin patrones async complejos
3. **Depuración:** Los virtual threads funcionan con todas las herramientas de debug y profiling existentes
4. **Rendimiento:** Significativamente mejor que los pools de threads tradicionales para aplicaciones I/O-intensivas

**Impacto en el Mundo Real:**

Un servidor web que antes podía manejar 1,000 usuarios concurrentes con ajuste cuidadoso, ahora puede manejar 100,000 usuarios con el mismo código, simplemente usando virtual threads en lugar de platform threads.

---

## La Línea de Tiempo Completa de un Vistazo

| Año | Característica | Qué Resolvió | Limitación |
|-----|---------------|--------------|------------|
| 1995 | \`Runnable\` | Threading básico | No retorna resultado |
| 2004 | \`Callable\`, \`Future\` | Retornar resultados | Incómodo para encadenar |
| 2004 | \`ExecutorService\` | Gestión de pool de threads | Aún usaba platform threads |
| 2014 | \`CompletableFuture\` | Encadenamiento async y composición | Threads aún costosos de crear |
| 2023 | Virtual Threads | Concurrencia ligera y escalable | ¡Ninguna (en rigor)! |

---

## ¿Cuál Deberías Usar?

**Elige \`Runnable\` si:** Estás aprendiendo los fundamentos de Java o escribiendo tareas simples en background (raramente usado hoy)

**Elige \`Callable\` + \`Future\` si:** Necesitas pooling básico de threads para un número pequeño de tareas concurrentes

**Elige \`CompletableFuture\` si:** Estás combinando múltiples operaciones async o necesitas código no bloqueante con buena componibilidad

**Elige Virtual Threads si:** Estás construyendo aplicaciones modernas, especialmente servicios web, APIs, o cualquier cosa que maneje muchos usuarios concurrentes (¡este es el futuro!)

---

## El Panorama General: Por Qué Importa Esta Evolución

Cada mejora en el modelo de threading de Java resolvió problemas reales que enfrentaban los desarrolladores:

- **Runnable** hizo el threading accesible para todos
- **Callable & ExecutorService** hizo el threading seguro con pools de threads
- **CompletableFuture** hizo el código async legible
- **Virtual Threads** hizo el escalado concurrente simple y eficiente

Esta evolución refleja cómo Java funciona: toma ideas del mundo que lo rodea, las mejora cuidadosamente, y le da a los desarrolladores herramientas poderosas y productivas.

---

## Mirando hacia Adelante

Los virtual threads están estabilizados y listos para producción en Java 21+. Representan un cambio fundamental en cómo pensamos sobre la concurrencia:

- **Antes:** "¿Cuántos threads podemos crear de forma segura?"
- **Después:** "Crea tantos virtual threads como necesites; Java administrará los OS threads eficientemente."

El camino desde \`Runnable\` hasta los virtual threads muestra cómo la evolución de un lenguaje no se trata solo de agregar características—se trata de resolver problemas humanos reales con soluciones elegantes y prácticas.

---

## Conclusión

La historia de threading de Java es una de mejora continua. Desde el simple modelo de una tarea a la vez con \`Runnable\`, pasando por la complejidad de callbacks del async temprano, hasta las elegantes cadenas de \`CompletableFuture\`, y finalmente la ligereza revolucionaria de los virtual threads—cada paso hizo a Java mejor para construir aplicaciones del mundo real.

Si estás aprendiendo Java en 2024, estás en el mejor momento: los virtual threads hacen la programación concurrente más simple y accesible que nunca. Si mantienes código legado, entender esta evolución te ayuda a apreciar por qué diferentes partes de tu codebase fueron escritas como fueron.

En resumen, la evolución del threading en Java es una clase magistral de cómo debería funcionar el diseño de lenguajes: escucha a los desarrolladores, resuelve problemas reales, y sigue mejorando las cosas.
`

const JAVA_CONCURRENCY_CONTENT_ES = `# Conceptos de Concurrencia en Java: Dominando la Seguridad de Hilos y la Sincronización

## Introducción: Por Qué Necesitamos Estas Herramientas

Imagina un único baño en una oficina con 100 empleados. Sin reglas, el caos reinaría—varias personas intentando entrar simultáneamente, cerraduras rompiéndose, personas empujándose. Los conceptos de concurrencia son las "reglas y cerraduras" que previenen este caos en los programas multi-hilo.

Cuando múltiples threads intentan acceder al mismo recurso (como datos en memoria), pueden ocurrir cosas malas:
- Dos threads podrían leer el mismo valor y ambos actualizarlo, causando que una actualización se pierda
- Un thread podría ver actualizaciones parciales de otro thread (datos corruptos)
- Los threads podrían esperar indefinidamente por algo que nunca ocurrirá

Esta guía explora las herramientas que Java provee para coordinar threads de forma segura y eficiente. Estas son algunas de las herramientas más poderosas—y más mal entendidas—en Java.

---

## Parte 1: La Fundación — Monitors y Synchronized

### ¿Qué es un Monitor?

Un **monitor** es un concepto en programación concurrente que viene de los años 70. Piénsalo como una "sala protegida" a la que solo un thread puede entrar a la vez.

En Java, el mecanismo de monitor incorporado se llama **\`synchronized\`**:

\`\`\`java
// Usando synchronized en un método
public synchronized void actualizarSaldo(double monto) {
    saldo = saldo + monto;
}

// Solo un thread puede ejecutar esto a la vez
// Los otros threads tienen que esperar afuera
\`\`\`

**La Analogía del Mundo Real:**

Imagina la ventanilla de un cajero de banco con la regla "de uno en uno":
- Solo un cliente puede estar en la ventanilla
- Los demás esperan en fila
- Cuando un cliente termina, entra el siguiente
- Esto previene que dos clientes accedan a tu cuenta simultáneamente

### Cómo Funcionan los Monitors

Cada objeto en Java es un monitor. Cuando usas \`synchronized\`:

\`\`\`java
public class CuentaBancaria {
    private double saldo = 1000;

    public synchronized void retirar(double monto) {
        if (saldo >= monto) {
            saldo = saldo - monto;
        }
    }
}
\`\`\`

Detrás de escena:
1. Un thread intenta ejecutar el método
2. Si ningún otro thread está en un bloque synchronized de este objeto, entra
3. Los demás threads esperan en una cola (llamada "entry set")
4. Cuando el thread sale, uno de los threads en espera obtiene su turno

### El Lock (Monitor Lock Implícito)

Cada objeto Java tiene un lock implícito (también llamado monitor lock):

\`\`\`java
Object lock = new Object();

synchronized(lock) {
    // Solo un thread a la vez puede estar aquí
}
\`\`\`

**Limitaciones de Synchronized:**

- **Granularidad gruesa:** Bloquea el objeto o método entero
- **Sin espera con timeout:** Si un thread necesita el lock, espera indefinidamente
- **Sin garantías de equidad:** Cualquier thread podría obtener el lock a continuación
- **Sin forma de verificar disponibilidad:** O lo obtienes o esperas

---

## Parte 2: La Interfaz Lock — Control de Grano Fino

### Introducción a Lock

En Java 5, la interfaz \`Lock\` fue introducida para resolver las limitaciones de \`synchronized\`:

\`\`\`java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

Lock lock = new ReentrantLock();

lock.lock();
try {
    saldo = saldo + monto;
} finally {
    lock.unlock();
}
\`\`\`

### Tipos de Locks

**1. ReentrantLock — El Lock Estándar**

\`\`\`java
Lock lock = new ReentrantLock();

if (lock.tryLock(5, TimeUnit.SECONDS)) {
    try {
        // Hacer trabajo protegido
    } finally {
        lock.unlock();
    }
} else {
    System.out.println("No se pudo adquirir el lock después de 5 segundos");
}
\`\`\`

**Características Clave:**
- \`lock()\` - Esperar indefinidamente
- \`tryLock()\` - Intentar una vez sin esperar
- \`tryLock(tiempo, unidad)\` - Intentar con un timeout
- \`unlock()\` - Liberar el lock
- Modos justo/injusto: Puedes especificar equidad (primero en llegar, primero en ser atendido)

**2. ReadWriteLock — Optimizado para Lectores**

\`\`\`java
ReadWriteLock lock = new ReentrantReadWriteLock();

// Muchos threads pueden leer simultáneamente
lock.readLock().lock();
try {
    double saldoActual = saldo;
    return saldoActual;
} finally {
    lock.readLock().unlock();
}

// Pero escribir es exclusivo
lock.writeLock().lock();
try {
    saldo = saldo + monto;
} finally {
    lock.writeLock().unlock();
}
\`\`\`

**3. StampedLock — Bloqueo Optimista**

\`\`\`java
StampedLock lock = new StampedLock();

long stamp = lock.tryOptimisticRead();
double valor = saldo;

if (!lock.validate(stamp)) {
    stamp = lock.readLock();
    try {
        valor = saldo;
    } finally {
        lock.unlockRead(stamp);
    }
}
\`\`\`

**Cuándo Usar Cada Lock:**

| Tipo de Lock | Mejor Para | Ventaja |
|--------------|-----------|---------|
| \`synchronized\` | Casos simples | Incorporado, sin imports |
| \`ReentrantLock\` | Necesitas timeout o equidad | Más control que synchronized |
| \`ReadWriteLock\` | Muchos lectores, pocos escritores | Mejor rendimiento para cargas de lectura intensiva |
| \`StampedLock\` | Concurrencia ultra-alta | Más eficiente, pero más difícil de usar |

---

## Parte 3: Herramientas de Coordinación — Sincronizando Múltiples Threads

### Semaphore — Controlando el Acceso

Un **semáforo** es como un estacionamiento con un número limitado de espacios:

\`\`\`java
Semaphore estacionamiento = new Semaphore(3);

void entrarEstacionamiento() {
    estacionamiento.acquire();
    try {
        usarEstacionamiento();
    } finally {
        estacionamiento.release();
    }
}
\`\`\`

**Ejemplo Práctico:**

\`\`\`java
Semaphore conexionesBD = new Semaphore(10);

public void ejecutarConsulta(String sql) throws InterruptedException {
    conexionesBD.acquire();
    try {
        baseDeDatos.query(sql);
    } finally {
        conexionesBD.release();
    }
}
\`\`\`

---

### CountDownLatch — Esperar Múltiples Eventos

Un **CountDownLatch** es una puerta de un solo sentido que se abre cuando una cuenta regresiva llega a cero:

\`\`\`java
CountDownLatch latch = new CountDownLatch(3);

for (int i = 0; i < 3; i++) {
    new Thread(() -> {
        try {
            hacerAlgunTrabajo();
        } finally {
            latch.countDown();
        }
    }).start();
}

latch.await();
System.out.println("¡Todos los workers completaron!");
\`\`\`

**Ejemplo Práctico: Procesamiento de Datos en Paralelo**

\`\`\`java
public class ProcesadorDeDatos {
    public void procesarDatos(List<ChunkDeDatos> chunks) throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(chunks.size());

        for (ChunkDeDatos chunk : chunks) {
            executor.submit(() -> {
                try {
                    procesarChunk(chunk);
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        System.out.println("¡Todos los chunks procesados!");
    }
}
\`\`\`

---

### CyclicBarrier — Punto de Sincronización

Un **CyclicBarrier** espera hasta que un número especificado de threads hayan llegado, luego los libera a todos juntos:

\`\`\`java
CyclicBarrier barrera = new CyclicBarrier(3, () -> {
    System.out.println("¡Todos los threads se encontraron en la barrera!");
});

new Thread(() -> {
    hacerTrabajo();
    barrera.await();
    System.out.println("Procediendo después de la barrera");
}).start();
\`\`\`

**CountDownLatch vs CyclicBarrier:**

| Característica | CountDownLatch | CyclicBarrier |
|----------------|----------------|---------------|
| Dirección | Un sentido | Reutilizable |
| Reset | No (uso único) | Sí (se resetea automáticamente) |
| Disparador | Completar tarea | Todos los threads llegan |
| Caso de Uso | Esperar inicialización | Procesamiento multi-fase |

---

## Parte 4: Visibilidad de Memoria — La Palabra Clave Volatile

### El Problema

\`\`\`java
public class Bandera {
    private boolean lista = false;
    private int valor = 0;

    public void setValor(int v) {
        valor = v;
        lista = true;
    }
}
\`\`\`

Sin sincronización apropiada, el Thread 2 podría ver \`lista = true\` pero nunca ver el \`valor\` actualizado, o quedarse atascado en un bucle de espera ocupada.

### La Solución: Volatile

\`\`\`java
public class Bandera {
    private volatile boolean lista = false;
    private volatile int valor = 0;
}
\`\`\`

**Qué Hace \`volatile\`:**

- **Visibilidad:** Garantiza que las escrituras son visibles para todos los threads inmediatamente
- **Ordenamiento:** Previene que el compilador reordene operaciones de memoria
- **Sin Atomicidad:** No hace que las operaciones compuestas sean atómicas

\`\`\`java
// ¡Esto TODAVÍA NO es atómico!
volatile int contador = 0;
contador++;  // leer-modificar-escribir: 3 operaciones separadas
\`\`\`

---

## Parte 5: Operaciones Atómicas — Números Thread-Safe

\`\`\`java
import java.util.concurrent.atomic.AtomicInteger;

AtomicInteger contador = new AtomicInteger(0);

contador.incrementAndGet();
contador.getAndAdd(5);
contador.compareAndSet(10, 20);
\`\`\`

**Clases Atómicas Disponibles:**

\`\`\`java
AtomicInteger        // Para int
AtomicLong           // Para long
AtomicBoolean        // Para boolean
AtomicReference<T>   // Para cualquier objeto
AtomicIntegerArray   // Array de ints
\`\`\`

**Contador Seguro:**

\`\`\`java
public class ContadorSeguro {
    private AtomicInteger cuenta = new AtomicInteger(0);

    public void incrementar() {
        cuenta.incrementAndGet();  // ¡Sin sincronización necesaria!
    }

    public int getValor() {
        return cuenta.get();
    }
}
\`\`\`

---

## Parte 6: ThreadLocal — Aislamiento por Thread

\`\`\`java
public class ConexionBaseDeDatos {
    private static ThreadLocal<Connection> conexionHolder =
        ThreadLocal.withInitial(() -> crearConexion());

    public static Connection getConexion() {
        return conexionHolder.get();
    }

    public static void limpiar() {
        conexionHolder.remove();  // ¡Prevenir fugas de memoria!
    }
}
\`\`\`

**Usos Comunes:**
- Conexiones a base de datos por thread
- Datos de sesión en aplicaciones web
- Contexto de transacción
- Utilidades de formateo (ej. \`SimpleDateFormat\`)

---

## Parte 7: El Kit Completo de Concurrencia

### Tabla de Referencia Rápida

| Concepto | Propósito | Threads Involucrados | Caso de Uso |
|----------|-----------|---------------------|-------------|
| \`synchronized\` | Exclusión mutua | 1 a la vez | Secciones protegidas simples |
| \`ReentrantLock\` | Exclusión mutua (avanzado) | 1 a la vez | Cuando necesitas timeouts |
| \`Semaphore\` | Limitación de recursos | Hasta N | Pools de conexiones, rate limiting |
| \`CountDownLatch\` | Esperar eventos | N → 0 | Inicialización, esperar completitud |
| \`CyclicBarrier\` | Punto de sincronización | N threads | Procesamiento multi-fase |
| \`volatile\` | Visibilidad de memoria | Muchos | Variables bandera |
| \`AtomicInteger\` | Operaciones atómicas | Muchos | Contadores sin locks |
| \`ThreadLocal\` | Aislamiento por thread | Aislados | Estado por thread |

---

## Parte 8: Errores Comunes y Mejores Prácticas

### Error 1: Olvidar Liberar un Lock

\`\`\`java
// MAL - El lock podría no liberarse nunca si ocurre una excepción
Lock lock = new ReentrantLock();
lock.lock();
algunMetodo();
lock.unlock();

// BIEN
Lock lock = new ReentrantLock();
lock.lock();
try {
    algunMetodo();
} finally {
    lock.unlock();
}
\`\`\`

### Error 2: Mezclar volatile con Operaciones Compuestas

\`\`\`java
// MAL - No es atómico aunque sea volatile
volatile int cuenta = 0;
cuenta++;

// BIEN
AtomicInteger cuenta = new AtomicInteger(0);
cuenta.incrementAndGet();
\`\`\`

### Error 3: Sobre-Sincronizar

\`\`\`java
// MAL - Bloquea por demasiado tiempo
synchronized void procesarLista(List<Item> items) {
    for (Item item : items) {
        procesarItem(item);  // Trabajo lento dentro del lock
    }
}

// BIEN - Bloquear solo lo necesario
void procesarLista(List<Item> items) {
    for (int i = 0; i < items.size(); i++) {
        Item itemAProcesar;
        synchronized(items) {
            itemAProcesar = items.get(i);
        }
        procesarItem(itemAProcesar);
    }
}
\`\`\`

### Mejores Prácticas

1. **Preferir herramientas de alto nivel:** Usar \`CountDownLatch\`, \`CyclicBarrier\`, \`Semaphore\` sobre locks directos
2. **Mantener las secciones críticas pequeñas:** Minimizar el tiempo con locks tomados
3. **Usar try-finally:** Siempre liberar locks en bloques finally
4. **Considerar la inmutabilidad:** La mejor sincronización es no compartir en absoluto
5. **Perfilar antes de optimizar:** No usar \`StampedLock\` sin haber medido el cuello de botella

---

## Parte 9: Ejemplos del Mundo Real

### Pool de Recursos Thread-Safe

\`\`\`java
public class PoolDeConexiones {
    private final Queue<Connection> disponibles = new LinkedList<>();
    private final Semaphore semaforo;
    private final Lock lock = new ReentrantLock();

    public PoolDeConexiones(int maxConexiones) {
        this.semaforo = new Semaphore(maxConexiones);
        for (int i = 0; i < maxConexiones; i++) {
            disponibles.offer(crearConexion());
        }
    }

    public Connection getConexion() throws InterruptedException {
        semaforo.acquire();
        lock.lock();
        try {
            return disponibles.poll();
        } finally {
            lock.unlock();
        }
    }

    public void devolverConexion(Connection conn) {
        lock.lock();
        try {
            disponibles.offer(conn);
        } finally {
            lock.unlock();
        }
        semaforo.release();
    }
}
\`\`\`

### Almacén de Datos con Muchas Lecturas

\`\`\`java
public class AlmacenUsuarios {
    private final Map<Integer, Usuario> usuarios = new HashMap<>();
    private final ReadWriteLock lock = new ReentrantReadWriteLock();

    public Usuario getUsuario(int id) {
        lock.readLock().lock();
        try {
            return usuarios.get(id);
        } finally {
            lock.readLock().unlock();
        }
    }

    public void actualizarUsuario(Usuario usuario) {
        lock.writeLock().lock();
        try {
            usuarios.put(usuario.getId(), usuario);
        } finally {
            lock.writeLock().unlock();
        }
    }
}
\`\`\`

---

## Conclusión: Eligiendo Tus Herramientas con Sabiduría

El kit de concurrencia de Java ha evolucionado durante dos décadas para proveer soluciones en diferentes niveles:

- **Bajo nivel:** Primitivas de sincronización (monitors, locks)
- **Nivel medio:** Herramientas de coordinación (semáforos, latches, barreras)
- **Alto nivel:** Visibilidad de memoria (volatile, clases atómicas)
- **Especializado:** Aislamiento de threads (ThreadLocal)

Entender cuándo aplicar cada herramienta es la diferencia entre código que es seguro bajo carga y código que falla en producción de formas sutiles y difíciles de reproducir.

**Domina estos conceptos y escribirás código que es seguro, rápido y confiable.**
`

const posts: BlogPost[] = [
  {
    id: 'java-concurrency',
    slug: 'java-concurrency',
    title: {
      en: 'Java Concurrency Concepts: Mastering Thread Safety and Synchronization',
      es: 'Conceptos de Concurrencia en Java: Dominando la Seguridad de Hilos y la Sincronización',
    },
    excerpt: {
      en: 'A practical guide to every major Java concurrency tool — synchronized, locks, semaphores, latches, barriers, volatile, atomics, and ThreadLocal — with real-world examples and a decision tree for choosing the right one.',
      es: 'Una guía práctica de todas las herramientas de concurrencia de Java — synchronized, locks, semáforos, latches, barriers, volatile, atómicos y ThreadLocal — con ejemplos del mundo real y un árbol de decisión para elegir la correcta.',
    },
    content: { en: JAVA_CONCURRENCY_CONTENT, es: JAVA_CONCURRENCY_CONTENT_ES },
    coverImage: '/java_concurrency_toolkit.svg',
    author,
    publishedAt: '2026-06-09',
    tags: ['Java', 'Concurrency', 'Thread Safety', 'Backend'],
    readingTimeMinutes: 15,
  },
  {
    id: 'java-threads',
    slug: 'java-threads',
    title: {
      en: 'The Evolution of Java Threads: From Simple to Revolutionary',
      es: 'La Evolución de los Threads en Java: De lo Simple a lo Revolucionario',
    },
    excerpt: {
      en: 'A guided tour through 25+ years of Java threading — from the humble Runnable to virtual threads — explaining why each evolution mattered and when to use each tool today.',
      es: 'Un recorrido guiado por más de 25 años de threading en Java — desde el humilde Runnable hasta los virtual threads — explicando por qué cada evolución importó y cuándo usar cada herramienta hoy.',
    },
    content: { en: JAVA_THREADS_CONTENT, es: JAVA_THREADS_CONTENT_ES },
    coverImage: '/java_threads.jpg',
    author,
    publishedAt: '2026-06-09',
    tags: ['Java', 'Concurrency', 'Virtual Threads', 'Backend'],
    readingTimeMinutes: 10,
  },
]

// Returns all posts sorted by publishedAt desc.
// Future: replace with fetch('/api/posts') and make async.
export function getBlogPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

// Future: replace with fetch(`/api/posts/${slug}`) and make async.
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}
