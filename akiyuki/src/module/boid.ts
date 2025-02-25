// boid.ts
import { Ref, ref } from 'vue';

interface BoidParams {
  separationDistance: number;
  alignmentDistance: number;
  cohesionDistance: number;
  separationWeight: number;
  alignmentWeight: number;
  cohesionWeight: number;
  maxSpeed: number;
  fieldOfView: number;
}

interface Vector {
  x: number;
  y: number;
}

interface Bird {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
}

// スライダーの値を保持するオブジェクト（リアクティブにする）
export const boidParams: Ref<BoidParams> = ref({
  separationDistance: 20,
  alignmentDistance: 50,
  cohesionDistance: 100,
  separationWeight: 1.0,
  alignmentWeight: 1.0,
  cohesionWeight: 1.0,
  maxSpeed: 2.0,
  fieldOfView: 90
});

// ベクトルの長さを制限する関数
export const limitVector = (vx: number, vy: number, max: number): Vector => {
  let magnitude = Math.sqrt(vx * vx + vy * vy);
  if (magnitude === 0) {
    vx = (Math.random() * 2 - 1) * 0.1; // 小さなランダム値を与える
    vy = (Math.random() * 2 - 1) * 0.1;
    magnitude = Math.sqrt(vx * vx + vy * vy);
  }
  if (magnitude > max) {
    const ratio = max / magnitude;
    return { x: vx * ratio, y: vy * ratio };
  }
  return { x: vx, y: vy };
};

// 視野角内かどうかをチェックする関数
export const isInFieldOfView = (bird: Bird, other: Bird): boolean => {
  const dx = other.x - bird.x;
  const dy = other.y - bird.y;
  const angleToOther = Math.atan2(dy, dx);
  const angleDiff = Math.abs(angleToOther - bird.angle);
  return angleDiff <= (boidParams.value.fieldOfView / 2) * (Math.PI / 180) ||
         angleDiff >= 2 * Math.PI - (boidParams.value.fieldOfView / 2) * (Math.PI / 180);
};

// 分離力を計算（視野角を考慮）
export const calculateSeparation = (bird: Bird, neighbors: Bird[]): Vector => {
  let fx = 0, fy = 0, count = 0;
  neighbors.forEach(other => {
    if (isInFieldOfView(bird, other)) {
      const dx = bird.x - other.x;
      const dy = bird.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0 && distance < boidParams.value.separationDistance) {
        const force = (boidParams.value.separationDistance - distance) / distance;
        fx += dx * force;
        fy += dy * force;
        count++;
      }
    }
  });
  if (count > 0) {
    fx /= count;
    fy /= count;
  }
  return { x: fx * boidParams.value.separationWeight, y: fy * boidParams.value.separationWeight };
};

// 整列力を計算（視野角を考慮）
export const calculateAlignment = (bird: Bird, neighbors: Bird[]): Vector => {
  let vx = 0, vy = 0, count = 0;
  neighbors.forEach(other => {
    if (isInFieldOfView(bird, other)) {
      const distance = Math.sqrt((bird.x - other.x) ** 2 + (bird.y - other.y) ** 2);
      if (distance < boidParams.value.alignmentDistance) {
        vx += other.vx;
        vy += other.vy;
        count++;
      }
    }
  });
  if (count > 0) {
    vx = (vx / count - bird.vx) * boidParams.value.alignmentWeight;
    vy = (vy / count - bird.vy) * boidParams.value.alignmentWeight;
    if (vx === 0 && vy === 0) {
      vx = (Math.random() * 2 - 1) * 0.1;
      vy = (Math.random() * 2 - 1) * 0.1;
    }
  }
  return { x: vx, y: vy };
};

// 結合力を計算（視野角を考慮）
export const calculateCohesion = (bird: Bird, neighbors: Bird[]): Vector => {
  let cx = 0, cy = 0, count = 0;
  neighbors.forEach(other => {
    if (isInFieldOfView(bird, other)) {
      const distance = Math.sqrt((bird.x - other.x) ** 2 + (bird.y - other.y) ** 2);
      if (distance < boidParams.value.cohesionDistance) {
        cx += other.x;
        cy += other.y;
        count++;
      }
    }
  });
  if (count > 0) {
    cx = cx / count - bird.x;
    cy = cy / count - bird.y;
    const distance = Math.sqrt(cx * cx + cy * cy);
    cx = (cx / distance) * boidParams.value.cohesionWeight;
    cy = (cy / distance) * boidParams.value.cohesionWeight;
  }
  return { x: cx, y: cy };
};

export const initializeBirds = (
  numberOfBirds: number = 100, width: number = 800, height: number = 600): Bird[] => {
  const birds: Bird[] = [];
  for (let i = 0; i < numberOfBirds; i++) {
    birds.push({
      x: Math.random() * (width - 10) + 5,
      y: Math.random() * (height - 10) + 5,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      angle: Math.random() * 2 * Math.PI, // 鳥の向きを追加
    });
  }
  return birds;
};

export const updateMouseBird = (mouseBird: Bird, mousePosition: Vector): void => {
  const dx = mousePosition.x - mouseBird.x;
  const dy = mousePosition.y - mouseBird.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 1) {
    mouseBird.vx = (dx / distance) * 2.0;
    mouseBird.vy = (dy / distance) * 2.0;
    mouseBird.x += mouseBird.vx;
    mouseBird.y += mouseBird.vy;
    mouseBird.angle = Math.atan2(mouseBird.vy, mouseBird.vx);
  }
}
